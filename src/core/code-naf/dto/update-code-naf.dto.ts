import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateCodeNafDto } from './create-code-naf.dto';

export class UpdateCodeNafDto extends PartialType(CreateCodeNafDto) {
    @ApiProperty()
    @IsNotEmpty()
    code: string;
    
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
