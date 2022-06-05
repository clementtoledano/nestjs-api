import { Role } from "src/core/roles/entities/role.entity";
import { Status } from "src/core/statuses/entities/status.entity";

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
    role?: Role;
    status?: Status;
    createdOn?: Date;
    updatedOn?: Date;
}
