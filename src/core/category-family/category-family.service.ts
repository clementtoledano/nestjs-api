import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryFamilyDto } from './dto/create-category-family.dto';
import { UpdateCategoryFamilyDto } from './dto/update-category-family.dto';
import { CategoryFamilyEntity } from './entities/category-family.entity';

@Injectable()
export class CategoryFamilyService {
  public constructor(
    @InjectRepository(CategoryFamilyEntity)
    private readonly categoryFamilyRepository: Repository<CategoryFamilyEntity>,
  ) { }


  async create(createCategoryFamilyDto: CreateCategoryFamilyDto) {
    try {
      return await this.categoryFamilyRepository.save(this.categoryFamilyRepository.create(createCategoryFamilyDto));
    } catch (error) {
      throw new HttpException('Type allready exist', HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    const family = await this.categoryFamilyRepository.find();
    return family;
  }

  async findOneByIdOrThrow(id: string) {
    const companyType = await this.categoryFamilyRepository.findOne({ id });
    if (!companyType) {
      throw new NotFoundException('No company type found.');
    }
    return companyType;
  }

  async update(id: string, updateCategoryFamilyDto: UpdateCategoryFamilyDto) {
    try {

      const existingCategoryFamily = await this.findOneByIdOrThrow(id);

      const type = this.categoryFamilyRepository.create({
        ...existingCategoryFamily,
        ...updateCategoryFamilyDto,
      });

      const updatedCategoryFamily = await this.categoryFamilyRepository.save(type);

      return updatedCategoryFamily;

    } catch (error) {
      throw new BadRequestException('No company type found.');
    }
  }

  async remove(id: string) {
    const type = await this.findOneByIdOrThrow(id);

    await this.categoryFamilyRepository.remove([type]);

    return null;
  }
}
