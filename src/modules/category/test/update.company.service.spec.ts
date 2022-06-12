import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CategoryService } from '../category.service';
import { CategoryEntity, CategoryRepositoryFake } from '../entities/category.entity';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


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

        },],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));

  });


  it('throws an error no data provided', async () => {
    const { id, ...emptyCategory }: CategoryEntity = new CategoryEntity();

    try {
      await service.update(id, emptyCategory);
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


  it('should update category', async () => {
    const name = 'vin';

    const newCategory: CategoryEntity = {
      ...dataMock,
      name
    }
    const savedCategory = { ...newCategory }


    const categoryServiceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const categoryRepositoryCreateSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(newCategory);

    const categoryRepositorySaveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(savedCategory);


    const result = await service.update(newCategory.id, newCategory);

    expect(categoryServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      newCategory.id,
    );

    expect(categoryRepositoryCreateSpy).toHaveBeenCalledWith({
      ...dataMock,
      name,
    });

    expect(categoryRepositorySaveSpy).toHaveBeenCalledWith(newCategory);
    expect(result).toEqual(savedCategory);

  });
});




