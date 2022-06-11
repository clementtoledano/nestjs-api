import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ValueService } from '../value.service';
import { ValueEntity, ValueRepositoryFake } from '../entities/value.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/value.mock';

describe('Create ValueService', () => {
  let service: ValueService;
  let repository: Repository<ValueEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValueService,
        {
          provide: getRepositoryToken(ValueEntity),
          useClass: ValueRepositoryFake
        },
      ],
    }).compile();

    service = module.get<ValueService>(ValueService);
    repository = module.get<Repository<ValueEntity>>(getRepositoryToken(ValueEntity));

  });

  it('should delete value', async () => {

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




