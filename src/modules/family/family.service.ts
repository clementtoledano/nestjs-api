import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { FamilyEntity } from './entities/family.entity';

@Injectable()
export class FamilyService {
  public constructor(
    @InjectRepository(FamilyEntity)
    private readonly familyRepository: Repository<FamilyEntity>,
  ) { }


  async create(createFamilyDto: CreateFamilyDto) {
    try {
      return await this.familyRepository.save(this.familyRepository.create(createFamilyDto));
    } catch (error) {
      throw new HttpException('Type allready exist', HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    const family = await this.familyRepository.find();
    return family;
  }

  async findOneByIdOrThrow(id: string) {
    const companyType = await this.familyRepository.findOne({ id });
    if (!companyType) {
      throw new NotFoundException('No code NAF found.');
    }
    return companyType;
  }

  async update(id: string, updateFamilyDto: UpdateFamilyDto) {
    try {

      const existingFamily = await this.findOneByIdOrThrow(id);

      const type = this.familyRepository.create({
        ...existingFamily,
        ...updateFamilyDto,
      });

      const updatedFamily = await this.familyRepository.save(type);

      return updatedFamily;

    } catch (error) {
      throw new BadRequestException('No code NAF found.');
    }
  }

  async remove(id: string) {
    const type = await this.findOneByIdOrThrow(id);

    await this.familyRepository.remove([type]);

    return null;
  }
}
