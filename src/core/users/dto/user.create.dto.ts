import { IsNotEmpty, IsEmail, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { RoleEnum } from '@app/core/enum/role.enum';
// import { Unique } from 'typeorm';

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
    siretNumber: number;

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