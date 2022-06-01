import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { LoginUserDto } from '../dto/login.user.dto';
import { comparePasswords } from '../../../shared/utils';

@Injectable()
export class GetUserByLoginService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }


    async getByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords
        const areEqual = await comparePasswords(password, user.password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async findByPayload({ email }: any): Promise<UserDto> {
        return await this.usersRepository.findOne({ where: { email } });

    }
}