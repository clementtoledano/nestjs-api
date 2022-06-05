import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateCompanyTypeDto } from './create-company-type.dto';

export class UpdateCompanyTypeDto extends PartialType(CreateCompanyTypeDto) {
    @ApiProperty()
    @IsNotEmpty()
    code: string;
    
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
