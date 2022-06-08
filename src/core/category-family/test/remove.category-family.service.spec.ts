import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { CategoryFamilyService } from '../category-family.service';
import { CategoryFamilyEntity, CategoryFamilyRepositoryFake } from '../entities/category-family.entity';

import dataMock from '../../../shared/mock/category-family.mock'
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Create CategoryFamilyService', () => {
  let service: CategoryFamilyService;
  let repository: Repository<CategoryFamilyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryFamilyService,
        {
          provide: getRepositoryToken(CategoryFamilyEntity),
          useClass: CategoryFamilyRepositoryFake
        },],
    }).compile();

    service = module.get<CategoryFamilyService>(CategoryFamilyService);
    repository = module.get<Repository<CategoryFamilyEntity>>(getRepositoryToken(CategoryFamilyEntity));

  });


  it('should remove family', async () => {

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




