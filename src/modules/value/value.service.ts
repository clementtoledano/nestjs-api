import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateValueDto } from './dto/create-value.dto';
import { UpdateValueDto } from './dto/update-value.dto';
import { ValueEntity } from './entities/value.entity';

@Injectable()
export class ValueService {
  constructor(@InjectRepository(ValueEntity) private readonly valueRepository: Repository<ValueEntity>) { }

  async create(createValueDto: CreateValueDto) {
    try {
      return await this.valueRepository.save(this.valueRepository.create(createValueDto));
    } catch (error) {
      throw new HttpException('Value allready exist', HttpStatus.CONFLICT);

    }
  }

  async findAll() {
    const values = await this.valueRepository.find();
    return values;
  }

  async findOneByIdOrThrow(id: string) {
    const value = await this.valueRepository.findOne({ id });

    if (!value) {
      throw new NotFoundException('No value found.');
    }
    return value;
  }

  async update(id: string, updateValueDto: UpdateValueDto) {

    try {

      const existingValue = await this.findOneByIdOrThrow(id);

      const value = this.valueRepository.create({
        ...existingValue,
        ...updateValueDto,
      });

      const updatedValue = await this.valueRepository.save(value);

      return updatedValue;

    } catch (error) {
      throw new BadRequestException('No value found.');
    }
  }

  async remove(id: string) {
    const value = await this.findOneByIdOrThrow(id);

    await this.valueRepository.remove([value]);

    return null;

  }
}
