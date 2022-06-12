import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ProductionService } from '../production.service';
import { ProductionEntity, ProductionRepositoryFake } from '../entities/production.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/production.mock';

describe('Create ProductionService', () => {
  let service: ProductionService;
  let repository: Repository<ProductionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionService,
        {
          provide: getRepositoryToken(ProductionEntity),
          useClass: ProductionRepositoryFake
        },
      ],
    }).compile();

    service = module.get<ProductionService>(ProductionService);
    repository = module.get<Repository<ProductionEntity>>(getRepositoryToken(ProductionEntity));

  });

  it('should delete production', async () => {

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




