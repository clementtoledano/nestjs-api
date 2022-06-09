import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCodeNafDto } from './dto/create-code-naf.dto';
import { UpdateCodeNafDto } from './dto/update-code-naf.dto';
import { CodeNafEntity } from './entities/code-naf.entity';
import { CodeNafI } from './interfaces/code-naf.interface';

@Injectable()
export class CodeNafService {
  public constructor(
    @InjectRepository(CodeNafEntity)
    private readonly companyTypeRepository: Repository<CodeNafEntity>,
  ) { }


  async create(createCodeNafDto: CreateCodeNafDto) {
    try {
      return await this.companyTypeRepository.save(this.companyTypeRepository.create(createCodeNafDto));
    } catch (error) {
      throw new HttpException('Type allready exist', HttpStatus.CONFLICT);
    }
  }

  async findAll(): Promise<CodeNafI[]> {
    const codeNaf = await this.companyTypeRepository.find();
    return codeNaf;
  }


  async findOneByIdOrThrow(id: string) {
    const companyType = await this.companyTypeRepository.findOne({ id });
    if (!companyType) {
      throw new NotFoundException('No code Naf found.');
    }
    return companyType;
  }

  async update(id: string, updateCodeNafDto: UpdateCodeNafDto) {
    try {
      const existingCodeNaf = await this.findOneByIdOrThrow(id);
      const type = this.companyTypeRepository.create({
        ...existingCodeNaf,
        ...updateCodeNafDto,
      });
      const updatedCodeNaf = await this.companyTypeRepository.save(type);
      return updatedCodeNaf;

    } catch (error) {
      throw new BadRequestException('No code Naf found.');
    }
  }

  async remove(id: string) {
    const type = await this.findOneByIdOrThrow(id);
    await this.companyTypeRepository.remove([type]);
    return null;
  }

}
