import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

import { UnitEntity } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(@InjectRepository(UnitEntity) private readonly unitRepository: Repository<UnitEntity>) { }

  async create(createUnitDto: CreateUnitDto) {
    try {
      return await this.unitRepository.save(this.unitRepository.create(createUnitDto));
    } catch (error) {
      throw new HttpException('Unit allready exist', HttpStatus.CONFLICT);

    }
  }

  async findAll() {
    const categories = await this.unitRepository.find();
    return categories;
  }

  async findOneByIdOrThrow(id: string) {
    const unit = await this.unitRepository.findOne({ id });

    if (!unit) {
      throw new NotFoundException('No unit found.');
    }
    return unit;
  }

  async update(id: string, updateUnitDto: UpdateUnitDto) {

    try {

      const existingUnit = await this.findOneByIdOrThrow(id);

      const unit = this.unitRepository.create({
        ...existingUnit,
        ...updateUnitDto,
      });

      const updatedUnit = await this.unitRepository.save(unit);

      return updatedUnit;

    } catch (error) {
      throw new BadRequestException('No unit found.');
    }
  }

  async remove(id: string) {
    const unit = await this.findOneByIdOrThrow(id);

    await this.unitRepository.remove([unit]);

    return null;

  }
}