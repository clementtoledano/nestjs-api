import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';

import { FilterEntity } from './entities/filter.entity';

@Injectable()
export class FilterService {
  constructor(@InjectRepository(FilterEntity) private readonly filterRepository: Repository<FilterEntity>) { }

  async create(createFilterDto: CreateFilterDto) {
    try {
      return await this.filterRepository.save(this.filterRepository.create(createFilterDto));
    } catch (error) {
      throw new HttpException('Filter allready exist', HttpStatus.CONFLICT);

    }
  }

  async findAll() {
    const categories = await this.filterRepository.find();
    return categories;
  }

  async findOneByIdOrThrow(id: string) {
    const filter = await this.filterRepository.findOne({ id });

    if (!filter) {
      throw new NotFoundException('No filter found.');
    }
    return filter;
  }

  async update(id: string, updateFilterDto: UpdateFilterDto) {

    try {

      const existingFilter = await this.findOneByIdOrThrow(id);

      const filter = this.filterRepository.create({
        ...existingFilter,
        ...updateFilterDto,
      });

      const updatedFilter = await this.filterRepository.save(filter);

      return updatedFilter;

    } catch (error) {
      throw new BadRequestException('No filter found.');
    }
  }

  async remove(id: string) {
    const filter = await this.findOneByIdOrThrow(id);

    await this.filterRepository.remove([filter]);

    return null;

  }
}