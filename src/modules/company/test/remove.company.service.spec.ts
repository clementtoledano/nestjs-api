import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CompanyService } from '../company.service';
import { CompanyEntity, CompanyRepositoryFake } from '../entities/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/company.mock';

describe('Create CompanyService', () => {
  let service: CompanyService;
  let repository: Repository<CompanyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useClass: CompanyRepositoryFake
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repository = module.get<Repository<CompanyEntity>>(getRepositoryToken(CompanyEntity));

  });

  it('should delete company', async () => {

    const serviceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const repositoryRemoveSpy = jest
      .spyOn(repository, 'remove')
      .mockResolvedValue(null as any);

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




