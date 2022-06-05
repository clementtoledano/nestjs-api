import { RoleI } from "src/core/role/interface/role.interface";
import { StatusI } from "src/core/status/interface/status.interface";

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
    role?: RoleI;
    status?: StatusI;
    createdOn?: Date;
    updatedOn?: Date;
}
