
import { UserI } from "../../../modules/user/interfaces/user.interface";

export interface JwtPayloadI {

    user: UserI;
    exp: number;
    iat: number;

}