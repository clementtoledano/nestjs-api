import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { RegistrationStatusI } from './interfaces/registration-status.interface';
import { LoginStatusI } from './interfaces/login-status.interface';
import { JwtPayloadI } from './interfaces/payload.interface';
import { UserI } from '../users/interfaces/user.interface';

import { CreateUserDto } from '../users/dto/create.user.dto';
import { LoginUserDto } from '../users/dto/login.user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

    ) { }

    async register(user: CreateUserDto): Promise<RegistrationStatusI> {
        let status: RegistrationStatusI = {
            success: true,
            message: 'user registered',
        };

        try {
            await this.usersService.create(user);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }

        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatusI> {
        // find user in db
        const user: UserI = await this.usersService.getByLogin(loginUserDto);

        // generate and sign token
        const token = this.generateJwt(user);

        return {
            email: user.email,
            ...token,
        };
    }

    async validateUser(payload: JwtPayloadI): Promise<UserI> {
        const user = await this.usersService.getByEmail(payload.user);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private generateJwt(user: UserI): any {
        const expiresIn = this.configService.get('AUTH_JWT_TOKEN_EXPIRES_IN');

        const accessToken = this.jwtService.sign({ user });
        return {
            expiresIn,
            accessToken,
        };
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async comparePasswords(password: string, storedPasswordHash: string): Promise<any> {
        return bcrypt.compare(password, storedPasswordHash);
    }

    verifyJwt(jwt: string): Promise<any> {
        return this.jwtService.verifyAsync(jwt);
    }


}
