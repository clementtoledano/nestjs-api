import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UnitService } from '../unit.service';
import { UnitEntity, UnitRepositoryFake } from '../entities/unit.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/unit.mock';

describe('Create UnitService', () => {
  let service: UnitService;
  let repository: Repository<UnitEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitService,
        {
          provide: getRepositoryToken(UnitEntity),
          useClass: UnitRepositoryFake
        },
      ],
    }).compile();

    service = module.get<UnitService>(UnitService);
    repository = module.get<Repository<UnitEntity>>(getRepositoryToken(UnitEntity));

  });

  it('should delete unit', async () => {

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




