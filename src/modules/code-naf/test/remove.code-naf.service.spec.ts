import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { CodeNafService } from '../code-naf.service';
import { CodeNafEntity, CodeNafRepositoryFake } from '../entities/code-naf.entity';

import dataMock from '../../../shared/mock/codeNaf.mock';

describe('Create CodeNafService', () => {
  let service: CodeNafService;
  let repository: Repository<CodeNafEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodeNafService,
        {
          provide: getRepositoryToken(CodeNafEntity),
          useClass: CodeNafRepositoryFake

        },],
    }).compile();

    service = module.get<CodeNafService>(CodeNafService);
    repository = module.get<Repository<CodeNafEntity>>(getRepositoryToken(CodeNafEntity));

  });


  it('should create company type', async () => {

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




