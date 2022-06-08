import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyTypeService } from '../../company-type/company-type.service';
import { CompanyTypeEntity } from '../../company-type/entities/company-type.entity';

import companyTypeMock from '../../../shared/mock/company-type.mock';

describe('Create CompanyTypeService', () => {
  let service: CompanyTypeService;
  let repository: Repository<CompanyTypeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyTypeService,
        {
          provide: getRepositoryToken(CompanyTypeEntity),
          useValue: {
            // find: jest.fn().mockResolvedValue([]),
            // findOneOrFail: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockReturnValue({}),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            // delete: jest.fn().mockResolvedValue(true),
          },
        },],
    }).compile();

    service = module.get<CompanyTypeService>(CompanyTypeService);
    repository = module.get<Repository<CompanyTypeEntity>>(getRepositoryToken(CompanyTypeEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('throws an error no data provided', async () => {
    const { id, ...emptyType }: CompanyTypeEntity = new CompanyTypeEntity();

    try {
      await service.update(id, emptyType);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });

  it('throws an error when no id', async () => {

    try {
      await service.update(companyTypeMock.id, companyTypeMock);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });


  it('should create company type', async () => {

    const newCompanyType: CompanyTypeEntity = {
      id: companyTypeMock.id,
      code: 'XXXX',
      name: 'blabla',
    }

    const { id, code, name } = newCompanyType

    jest.spyOn(repository, 'save').mockResolvedValueOnce(companyTypeMock);
    expect(await service.update(id, { code, name })).toEqual(companyTypeMock);
    expect(repository.save).toBeCalled();
    expect(repository.create).toBeCalled();
  });
});




