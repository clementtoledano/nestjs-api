import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

    // @ApiProperty({ enum: RoleEnum })
    // roles: RoleEnum;

    @ApiProperty({ required: false, default: true })
    isEnabled?: boolean = true;

    createdOn?: Date;
}