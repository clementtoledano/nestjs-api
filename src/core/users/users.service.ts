import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { comparePasswords } from '../../shared/utils';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    async getAll(): Promise<UserDto[]> {
        const user = await this.userRepo.find();
        return user;
    }

    async getOne(options?: object): Promise<UserDto> {
        const user = await this.userRepo.findOne(options);
        return user;
    }

    async getByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepo.findOne({ email });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords
        const areEqual = await comparePasswords(user.password, password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async getByPayload({ email }: any): Promise<UserDto> {
        return await this.getOne({ email });
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {
        // check if the user exists in the db
        const userInDb = await this.userRepo.findOne({ where: { email: userDto.email } });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: User = await this.userRepo.create(userDto);
        await this.userRepo.save(user);

        return UsersService._sanitizeUser(user);
    }



    // async passwordRecovery(
    //     email: string, 
    //     newUser: UserUpdateDto
    //   ): Promise<UserDetailDto | null> {
    //     const user = await this.userRepository.findOne({ email });
    //     console.log(user);
    //     if (!user) {
    //       throw new NotFoundException('The requested user could not be found');
    //     }
    //     const updatedUser = await this.userRepository.save({
    //       email,
    //       ...user,
    //       ...newUser,
    //       password: user.password ? await hash(user.password, 10) : user.password,
    //     });
    //     console.log(updatedUser);
    //     return new UserDetailDto(updatedUser);
    //   }



    private static _sanitizeUser(user: User) {
        delete user.password;
        return user;
    }
}
