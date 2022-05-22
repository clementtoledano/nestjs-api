import { ApiProperty } from "@nestjs/swagger";

// import { RoleEnum } from '../../../enum/role.enum';
export class UserDto {
    id: string;

    email: string;

    firstname: string;

    lastname: string;

    companyName: string;

    siretNumber: number;
    @ApiProperty({ example: 231654321, description: 'The age of the Cat' })
    phone: number;

    newsletter: boolean;

    createdOn?: Date;
    updatedOn?: Date;
}
