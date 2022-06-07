import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CompanyService } from '../company.service';
import { CompanyEntity, CompanyRepositoryFake } from '../entities/company.entity';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import dataMock from '../../../shared/mock/company.mock';

describe('Create CompanyService', () => {
  let service: CompanyService;
  let repositoryMock: Repository<CompanyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useClass: CompanyRepositoryFake

        },],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repositoryMock = module.get<Repository<CompanyEntity>>(getRepositoryToken(CompanyEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('throws an error no data provided', async () => {
    const { id, ...emptyCompany }: CompanyEntity = new CompanyEntity();

    try {
      await service.update(id, emptyCompany);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });

  it('throws an error when no id', async () => {

    try {
      await service.update(dataMock.id, dataMock);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });


  it('should update company', async () => {
    const address = '20 rue du chateau';

    const newCompany: CompanyEntity = {
      ...dataMock,
      address
    }
    const savedCompany = { ...newCompany }


    const companyServiceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const companyRepositoryCreateSpy = jest
      .spyOn(repositoryMock, 'create')
      .mockReturnValue(newCompany);

    const companyRepositorySaveSpy = jest
      .spyOn(repositoryMock, 'save')
      .mockResolvedValue(savedCompany);


    const result = await service.update(newCompany.id, newCompany);

    expect(companyServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      newCompany.id,
    );

    expect(companyRepositoryCreateSpy).toHaveBeenCalledWith({
      ...dataMock,
      address,
    });

    expect(companyRepositorySaveSpy).toHaveBeenCalledWith(newCompany);
    expect(result).toEqual(savedCompany);

  });
});




