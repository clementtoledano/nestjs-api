import { RoleEnum } from "src/core/role/role.enum";
import { StatusEnum } from "src/core/status/status.enum";

export interface UserI {
    id: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    companyName: string;
    sirenNumber: number;
    phone: number;
    newsletter: boolean;
    role: RoleEnum;
    status: StatusEnum;
    createdOn?: Date;
    updatedOn?: Date;
    hashPassword(): Promise<any>;
    emailToLowerCase(): void;
}
