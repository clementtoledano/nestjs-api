import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { CategoryEntity, CategoryRepositoryFake } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/category.mock';
import { CategoryService } from '../category.service';



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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    it('throws an error no name provided', async () => {
      const emptyUser: CategoryEntity = new CategoryEntity();

      try {
        await service.create(emptyUser);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('throws an error when name allready exist', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);

      try {
        await service.create(dataMock);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe('Code already exist');
      }
    });


    it('should create category', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();
    });
  });




});
