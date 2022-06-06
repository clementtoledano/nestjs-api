import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyTypeDto } from './dto/create-company-type.dto';
import { UpdateCompanyTypeDto } from './dto/update-company-type.dto';
import { CompanyTypeEntity } from './entities/company-type.entity';
import { CompanyTypeI } from './interfaces/company-type.interface';

@Injectable()
export class CompanyTypeService {
  public constructor(
    @InjectRepository(CompanyTypeEntity)
    private readonly companyTypeRepository: Repository<CompanyTypeEntity>,
  ) { }



  async create(createCompanyTypeDto: CreateCompanyTypeDto) {
    try {
      return await this.companyTypeRepository.save(this.companyTypeRepository.create(createCompanyTypeDto));
    } catch (error) {
      throw new HttpException('Type allready exist', HttpStatus.CONFLICT);

    }
  }

  async getAll(): Promise<CompanyTypeI[]> {
    const companyTypes = await this.companyTypeRepository.find();
    return companyTypes;
  }


  async findOneByIdOrThrow(id: string) {
    const companyType = await this.companyTypeRepository.findOne({ id });

    if (!companyType) {
      throw new NotFoundException('No company type found.');
    }
    return companyType;
  }

  async update(id: string, updateCompanyTypeDto: UpdateCompanyTypeDto) {
    try {

      const existingCompanyType = await this.findOneByIdOrThrow(id);

      const type = this.companyTypeRepository.create({
        ...existingCompanyType,
        ...updateCompanyTypeDto,
      });

      const updatedCompanyType = await this.companyTypeRepository.save(type);

      return updatedCompanyType;

    } catch (error) {
      throw new BadRequestException('No company type found.');
    }
  }

  async remove(id: string) {
    const type = await this.findOneByIdOrThrow(id);

    await this.companyTypeRepository.remove([type]);

    return null;

  }

}
