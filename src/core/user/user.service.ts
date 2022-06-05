import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
        const exists: boolean = await this._mailExists(newUser.email);

        if (!exists) {
            const user = await this.userRepository.save(this.userRepository.create(newUser));
            return this._sanitizeUser(user);
        } else {
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
        }
    }

    async getAll(): Promise<UserI[]> {
        const user = await this.userRepository.find();
        return user;
    }

    async getOne(options?: object): Promise<UserI> {
        const user = await this.userRepository.findOne(options);
        return user;
    }

    async getByLogin(user: LoginUserDto): Promise<UserI> {
        const foundUser: UserI = await this.getByEmail({ email: user.email });

        if (!foundUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // compare passwords
        const areEqual: boolean = await this.authService.comparePasswords(user.password, foundUser.password);

        if (!areEqual) {
            throw new HttpException('Login was not successfull, wrong credentials', HttpStatus.UNAUTHORIZED);
        }

        return foundUser;
    }

    async getByEmail({ email }: any): Promise<UserI> {
        return await this.userRepository.findOne({ email }, { select: ['id', 'email', 'password', 'role', 'status'] });
    }

    private async findOne(id: string): Promise<UserI> {
        return this.userRepository.findOne({ id });
    }




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

    private async _mailExists(email: string): Promise<boolean> {
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


    private _sanitizeUser(user: UserI) {
        delete user.password;
        return user;
    }
}
