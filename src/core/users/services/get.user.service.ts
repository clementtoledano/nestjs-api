import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class GetUserService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }


    async getById(id: string): Promise<UserDto> {
        return await this.usersRepository.findOne({ where: { id } });
    }

}