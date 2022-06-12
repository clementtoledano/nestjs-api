import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-prodution.dto';
import { ProductionEntity } from './entities/production.entity';

@Injectable()
export class ProductionService {
  constructor(@InjectRepository(ProductionEntity) private readonly productionRepository: Repository<ProductionEntity>) { }

  async create(createProductionDto: CreateProductionDto) {
    try {
      return await this.productionRepository.save(this.productionRepository.create(createProductionDto));
    } catch (error) {
      throw new HttpException('Production allready exist', HttpStatus.CONFLICT);

    }
  }

  async findAll() {
    const categories = await this.productionRepository.find();
    return categories;
  }

  async findOneByIdOrThrow(id: string) {
    const production = await this.productionRepository.findOne({ id });

    if (!production) {
      throw new NotFoundException('No production found.');
    }
    return production;
  }

  async update(id: string, updateProductionDto: UpdateProductionDto) {

    try {

      const existingProduction = await this.findOneByIdOrThrow(id);

      const production = this.productionRepository.create({
        ...existingProduction,
        ...updateProductionDto,
      });

      const updatedProduction = await this.productionRepository.save(production);

      return updatedProduction;

    } catch (error) {
      throw new BadRequestException('No production found.');
    }
  }

  async remove(id: string) {
    const production = await this.findOneByIdOrThrow(id);

    await this.productionRepository.remove([production]);

    return null;

  }
}
