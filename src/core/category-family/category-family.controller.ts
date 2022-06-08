import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryFamilyService } from './category-family.service';
import { CreateCategoryFamilyDto } from './dto/create-category-family.dto';
import { UpdateCategoryFamilyDto } from './dto/update-category-family.dto';

@Controller('category-family')
export class CategoryFamilyController {
  constructor(private readonly categoryFamilyService: CategoryFamilyService) { }

  @Post()
  create(@Body() createCategoryFamilyDto: CreateCategoryFamilyDto) {
    return this.categoryFamilyService.create(createCategoryFamilyDto);
  }

  @Get()
  findAll() {
    return this.categoryFamilyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryFamilyService.findOneByIdOrThrow(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryFamilyDto: UpdateCategoryFamilyDto) {
    return this.categoryFamilyService.update(id, updateCategoryFamilyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryFamilyService.remove(id);
  }
}
