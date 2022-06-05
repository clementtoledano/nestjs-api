import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserI } from '../user/interfaces/user.interface';
import { AuthService } from './auth.service';
import { JwtPayloadI } from './interfaces/payload.interface';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService, private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('AUTH_JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayloadI): Promise<UserI> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}