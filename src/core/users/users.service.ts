import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
// import { toUserDto } from '@shared/mapper';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user-login.dto';
// import { comparePasswords } from '@shared/utils';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }


    async findAll(): Promise<UserDto[]> {
        const user = await this.userRepo.find();
        return user;
    }


    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepo.findOne(options);
        return user;
    }

    async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { email } });

        // if (!user) {
        //     throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        // }

        // // compare passwords
        // const areEqual = await comparePasswords(user.password, password);

        // if (!areEqual) {
        //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        // }
        return user;
    }

    async findByPayload({ email }: any): Promise<UserDto> {
        return await this.findOne({ where: { email } });
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
        // return user;
    }

    private static _sanitizeUser(user: User) {
        delete user.password;
        return user;
    }
}