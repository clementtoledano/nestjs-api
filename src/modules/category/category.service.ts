import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.save(this.categoryRepository.create(createCategoryDto));
    } catch (error) {
      throw new HttpException('Category allready exist', HttpStatus.CONFLICT);

    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOneByIdOrThrow(id: string) {
    const category = await this.categoryRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException('No category found.');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {

    try {

      const existingCategory = await this.findOneByIdOrThrow(id);

      const category = this.categoryRepository.create({
        ...existingCategory,
        ...updateCategoryDto,
      });

      const updatedCategory = await this.categoryRepository.save(category);

      return updatedCategory;

    } catch (error) {
      throw new BadRequestException('No category found.');
    }
  }

  async remove(id: string) {
    const category = await this.findOneByIdOrThrow(id);

    await this.categoryRepository.remove([category]);

    return null;

  }
}
