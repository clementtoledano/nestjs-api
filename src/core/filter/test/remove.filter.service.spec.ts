import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { FilterService } from '../filter.service';
import { FilterEntity, FilterRepositoryFake } from '../entities/filter.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/filter.mock';

describe('Create FilterService', () => {
  let service: FilterService;
  let repository: Repository<FilterEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterService,
        {
          provide: getRepositoryToken(FilterEntity),
          useClass: FilterRepositoryFake
        },
      ],
    }).compile();

    service = module.get<FilterService>(FilterService);
    repository = module.get<Repository<FilterEntity>>(getRepositoryToken(FilterEntity));

  });

  it('should delete filter', async () => {

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




