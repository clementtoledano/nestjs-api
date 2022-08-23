import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../../constants/role.enum';
import { StatusEnum } from '../../../constants/status.enum';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    companyName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    sirenNumber: number;

    @ApiProperty()
    @IsNotEmpty()
    // @IsNumber()
    phone: number;

    @ApiProperty() newsletter: boolean;

    @ApiProperty({ enum: RoleEnum })
    role: RoleEnum;

    @ApiProperty({ enum: StatusEnum })
    status: StatusEnum;

    @ApiProperty({ required: false, default: true })
    isEnabled?: boolean = true;

    createdOn?: Date;
}