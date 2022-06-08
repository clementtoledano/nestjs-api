import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryFamilyService } from '../category-family.service';
import { CategoryFamilyEntity, CategoryFamilyRepositoryFake } from '../entities/category-family.entity';
import dataMock from '../../../shared/mock/category-family.mock'

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('throws an error no data provided', async () => {
    const { id, ...emptyType }: CategoryFamilyEntity = new CategoryFamilyEntity();

    try {
      await service.update(id, emptyType);
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

  it('throws an error no family data provided', async () => {
    const { id, ...emptyCategoryFamily }: CategoryFamilyEntity = new CategoryFamilyEntity();

    try {
      await service.update(id, emptyCategoryFamily);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });

  it('throws an error when no family id', async () => {

    try {
      await service.update(dataMock.id, dataMock);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });


  it('should update family', async () => {
    const name = 'nouveau nom';

    const newCategoryFamily: CategoryFamilyEntity = {
      ...dataMock,
      name
    }
    const savedCategoryFamily = { ...newCategoryFamily }


    const familyServiceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const familyRepositoryCreateSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(newCategoryFamily);

    const familyRepositorySaveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(savedCategoryFamily);


    const result = await service.update(newCategoryFamily.id, newCategoryFamily);

    expect(familyServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      newCategoryFamily.id,
    );

    expect(familyRepositoryCreateSpy).toHaveBeenCalledWith({
      ...dataMock,
      name,
    });

    expect(familyRepositorySaveSpy).toHaveBeenCalledWith(newCategoryFamily);
    expect(result).toEqual(savedCategoryFamily);

  });
});




