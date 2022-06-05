
import { UserI } from "src/core/user/interfaces/user.interface";

export interface JwtPayloadI {

    exp: number;
    iat: number;
    user: UserI;

}