import { PartialType } from '@nestjs/swagger';
import { CreateCategoryFamilyDto } from './create-category-family.dto';

export class UpdateCategoryFamilyDto extends PartialType(CreateCategoryFamilyDto) {}
