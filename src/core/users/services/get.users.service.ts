import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create.user.dto';
import { LoginUserDto } from '../dto/login.user.dto';
// import { comparePasswords } from '@shared/utils';

@Injectable()
export class GetUsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }


    async findAll(): Promise<UserDto[]> {
        const user = await this.usersRepository.find();
        return user;
    }


}