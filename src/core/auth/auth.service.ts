import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { UserDto } from '../users/dto/user.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { LoginUserDto } from '../users/dto/login.user.dto';
import { CreateUserService } from '../users/services/create.user.service';
import { GetUserByLoginService } from '../users/services/get.user.by.login.service';

@Injectable()
export class AuthService {
    constructor(private readonly createUserService: CreateUserService,
        private readonly getUserByLoginService: GetUserByLoginService,
        private readonly jwtService: JwtService) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };

        try {
            await this.createUserService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }

        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        // find user in db
        const user = await this.getUserByLoginService.getByLogin(loginUserDto);

        // generate and sign token
        const token = this._createToken(user);

        return {
            email: user.email,
            ...token,
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.getUserByLoginService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private _createToken({ email }: UserDto): any {
        const expiresIn = process.env.AUTH_JWT_TOKEN_EXPIRES_IN;

        const user: JwtPayload = { email };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken,
        };
    }
}