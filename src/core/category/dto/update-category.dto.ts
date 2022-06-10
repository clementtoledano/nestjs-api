import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FamilyI } from '../../../core/family/interfaces/family.interface';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

    @ApiProperty()
    name: string;

    @ApiProperty()
    family: FamilyI;

}
