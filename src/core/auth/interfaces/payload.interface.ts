
import { User } from "src/core/users/entities/user.entity";

export interface JwtPayloadI {

    exp: number;
    iat: number;
    user: User;

}