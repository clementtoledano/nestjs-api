import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CodeNafI } from '../../../modules/code-naf/interfaces/code-naf.interface';
import { UserI } from '../../../modules/user/interfaces/user.interface';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {

    @ApiProperty()
    @IsNotEmpty()
    label: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    siretNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    region: string;

    @ApiProperty()
    @IsNotEmpty()
    zipcode: string;

    @ApiProperty()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    website?: string;

    @ApiProperty()
    facebook?: string;

    @ApiProperty()
    instagram?: string;

    @ApiProperty()
    linkedin?: string;

    @ApiProperty()
    user: UserI;

    @ApiProperty()
    codeNaf?: CodeNafI;

}
