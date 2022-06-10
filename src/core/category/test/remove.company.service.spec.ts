import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CategoryService } from '../category.service';
import { CategoryEntity, CategoryRepositoryFake } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/category.mock';

describe('Create CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useClass: CategoryRepositoryFake
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));

  });

  it('should delete category', async () => {

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




