import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTypeService } from '../../company-type/company-type.service';
import { CompanyTypeEntity } from '../../company-type/entities/company-type.entity';
import { Repository } from 'typeorm';
import { CompanyRepositoryFake } from '../entities/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/company-type.mock';



describe('Create CompanyTypeService', () => {
  let service: CompanyTypeService;
  let repository: Repository<CompanyTypeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyTypeService,
        {
          provide: getRepositoryToken(CompanyTypeEntity),
          useClass: CompanyRepositoryFake
        },],
    }).compile();

    service = module.get<CompanyTypeService>(CompanyTypeService);
    repository = module.get<Repository<CompanyTypeEntity>>(getRepositoryToken(CompanyTypeEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    it('throws an error no email provided', async () => {
      const emptyUser: CompanyTypeEntity = new CompanyTypeEntity();

      try {
        await service.create(emptyUser);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('throws an error when email allready exist', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);

      try {
        await service.create(dataMock);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe('Code already exist');
      }
    });


    it('should create company type', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();
    });
  });




});
