import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';


@Injectable()
export class GetUsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }


    async findAll(): Promise<UserDto[]> {
        const users = await this.usersRepository.find();
        return users;
    }


}