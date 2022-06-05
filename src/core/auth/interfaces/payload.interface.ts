
import { User } from "src/core/user/entities/user.entity";

export interface JwtPayloadI {

    exp: number;
    iat: number;
    user: User;

}