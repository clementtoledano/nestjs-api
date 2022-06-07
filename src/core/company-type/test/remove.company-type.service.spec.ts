import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyTypeService } from '../../company-type/company-type.service';
import { CompanyTypeEntity } from '../../company-type/entities/company-type.entity';

import companyTypeMock from '../../../shared/mock/company-type.mock';

describe('Create CompanyTypeService', () => {
  let service: CompanyTypeService;
  let repositoryMock: Repository<CompanyTypeEntity>;

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
            // create: jest.fn().mockReturnValue({}),
            save: jest.fn(),
            // update: jest.fn().mockResolvedValue(true),
            remove: jest.fn().mockResolvedValue(true),
          },
        },],
    }).compile();

    service = module.get<CompanyTypeService>(CompanyTypeService);
    repositoryMock = module.get<Repository<CompanyTypeEntity>>(getRepositoryToken(CompanyTypeEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });





  it('should create company type', async () => {

    jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(companyTypeMock);
    jest.spyOn(service, 'findOneByIdOrThrow').mockResolvedValue(companyTypeMock);



    const result = await service.remove(companyTypeMock.id);

    expect(service.findOneByIdOrThrow).toHaveBeenCalledWith(companyTypeMock.id);

    expect(repositoryMock.remove).toBeCalled();
    expect(result).toBe(null);

  });
});




