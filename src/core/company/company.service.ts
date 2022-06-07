import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>) { }

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.companyRepository.save(this.companyRepository.create(createCompanyDto));
    } catch (error) {
      throw new HttpException('Company allready exist', HttpStatus.CONFLICT);

    }
    }

  async findAll() {
    const user = await this.companyRepository.find();
    return user;
  }

  async findOneByIdOrThrow(id: string) {
    const company = await this.companyRepository.findOne({ id });

    if (!company) {
      throw new NotFoundException('No company  found.');
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {

      const existingCompany = await this.findOneByIdOrThrow(id);

      const company = this.companyRepository.create({
        ...existingCompany,
        ...updateCompanyDto,
      });

      const updatedCompany = await this.companyRepository.save(company);

      return updatedCompany;

    } catch (error) {
      throw new BadRequestException('No company  found.');
    }
  }

  async remove(id: string) {
    const company = await this.findOneByIdOrThrow(id);

    await this.companyRepository.remove([company]);

    return null;

  }
}
