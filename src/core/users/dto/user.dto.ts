// import { RoleEnum } from '../../../enum/role.enum';
export class UserDto {
    id: string;

    email: string;

    firstname: string;

    lastname: string;

    companyName: string;

    siretNumber: number;

    phone: number;

    newsletter: boolean;

    createdOn?: Date;
    updatedOn?: Date;
}
