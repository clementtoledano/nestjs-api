import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../core/auth/auth.service';
import { UserI } from '../core/users/interfaces/user.interface';
import { UsersService } from '../core/users/users.service';

export interface RequestModel extends Request {
    user: UserI
}


@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }

    async use(req: RequestModel, res: Response, next: NextFunction) {
        try {
            const tokenArray: string[] = req.headers['authorization'].split(' ');
            const decodedToken = await this.authService.verifyJwt(tokenArray[1]);

            // make sure that the user is not deleted, or that props or rights changed compared to the time when the jwt was issued
            const user: UserI = await this.usersService.getOne(decodedToken.user.id);
            if (user) {
                // add the user to our req object, so that we can access it later when we need it
                // if it would be here, we would like overwrite
                req.user = user;
                next();
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } catch {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

}