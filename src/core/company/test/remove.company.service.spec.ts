import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyService } from '../company.service';
import { CompanyEntity } from '../entities/company.entity';

import companyMock from '../../../shared/mock/company.mock';

describe('Create CompanyService', () => {
  let service: CompanyService;
  let repositoryMock: Repository<CompanyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
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

    service = module.get<CompanyService>(CompanyService);
    repositoryMock = module.get<Repository<CompanyEntity>>(getRepositoryToken(CompanyEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });





  it('should create company ', async () => {

    jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(companyMock);
    jest.spyOn(service, 'findOneByIdOrThrow').mockResolvedValue(companyMock);



    const result = await service.remove(companyMock.id);

    expect(service.findOneByIdOrThrow).toHaveBeenCalledWith(companyMock.id);

    expect(repositoryMock.remove).toBeCalled();
    expect(result).toBe(null);

  });
});




