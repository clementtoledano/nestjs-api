import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create.user.dto';

@Injectable()
export class CreateUserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }


    async create(userDto: CreateUserDto): Promise<UserDto> {

        const userInDb = await this.userRepo.findOne({ where: { email: userDto.email } });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: User = await this.userRepo.create(userDto);
        await this.userRepo.save(user);

        return CreateUserService._sanitizeUser(user);
    }

    private static _sanitizeUser(user: User) {
        delete user.password;
        return user;
    }
}