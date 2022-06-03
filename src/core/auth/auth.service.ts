import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { UserDto } from '../users/dto/user.dto';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { LoginUserDto } from '../users/dto/login.user.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,

        private readonly jwtService: JwtService
        ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };

        try {
            await this.usersService.create(userDto);
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
        const user = await this.usersService.getByLogin(loginUserDto);

        // generate and sign token
        const token = this._createToken(user);

        return {
            email: user.email,
            ...token,
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.getByPayload(payload);
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