import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UserI } from './interfaces/user.interface';
import { UserEntity } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
    ) { }

    async create(newUser: CreateUserDto): Promise<UserI> {
        const exists: boolean = await this.mailExists(newUser.email);

        if (!exists) {
            const user: UserI = await this.userRepository.save(this.userRepository.create(newUser));
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
        }
    }

    async getAll(): Promise<UserI[]> {
        const user = await this.userRepository.find();
        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async getOne(options?: object): Promise<UserI> {
        const user = await this.userRepository.findOne(options);
        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async getByLogin(user: LoginUserDto): Promise<UserI> {
        const foundUser: UserI = await this.getByEmail({ email: user.email });

        if (!foundUser) {
            throw new NotFoundException('User not found');
        }

        // compare passwords
        const areEqual: boolean = await this.authService.comparePasswords(user.password, foundUser.password);

        if (!areEqual) {
            throw new HttpException('Login was not successfull, wrong credentials', HttpStatus.UNAUTHORIZED);
        }

        return foundUser;
    }

    async getByEmail({ email }: any): Promise<UserI> {
        const user = await this.userRepository.findOne({ email }, { select: ['id', 'email', 'password', 'role', 'status'] });

        if (!user) {
            throw new NotFoundException('User not found by email');
        }

        return user;


    }

    // private async findOne(id: string): Promise<UserI> {
    //     const user =  this.userRepository.findOne({ id });
    //     return user
    // }




    // async passwordRecovery(
    //     email: string, 
    //     newUser: UserUpdateDto
    //   ): Promise<UserDetailDto | null> {
    //     const user = await this.userRepositorysitory.findOne({ email });
    //     console.log(user);
    //     if (!user) {
    //       throw new NotFoundException('The requested user could not be found');
    //     }
    //     const updatedUser = await this.userRepositorysitory.save({
    //       email,
    //       ...user,
    //       ...newUser,
    //       password: user.password ? await hash(user.password, 10) : user.password,
    //     });
    //     console.log(updatedUser);
    //     return new UserDetailDto(updatedUser);
    //   }

    private async mailExists(email: string): Promise<boolean> {
        if (email) {
            const user = await this.userRepository.findOne({ email });
            if (user) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new BadRequestException("Email is needed");

        }

    }


    private sanitizeUser(user: UserI) {
        user.password = "undefined";
        return user;
    }
}
