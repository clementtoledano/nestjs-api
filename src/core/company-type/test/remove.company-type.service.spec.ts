import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CompanyTypeService } from '../../company-type/company-type.service';
import { CompanyTypeEntity, CompanyTypeRepositoryFake } from '../../company-type/entities/company-type.entity';

import dataMock from '../../../shared/mock/company-type.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Create CompanyTypeService', () => {
  let service: CompanyTypeService;
  let repository: Repository<CompanyTypeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyTypeService,
        {
          provide: getRepositoryToken(CompanyTypeEntity),
          useClass: CompanyTypeRepositoryFake

        },],
    }).compile();

    service = module.get<CompanyTypeService>(CompanyTypeService);
    repository = module.get<Repository<CompanyTypeEntity>>(getRepositoryToken(CompanyTypeEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });





  it('should create company type', async () => {

    const serviceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const repositoryRemoveSpy = jest
      .spyOn(repository, 'remove')
      .mockResolvedValue(null);

    const result = await service.remove(dataMock.id);

    expect(serviceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      dataMock.id,
    );

    expect(repositoryRemoveSpy).toHaveBeenCalledWith([
      dataMock,
    ]);

    expect(result).toBe(null);

  });
});




