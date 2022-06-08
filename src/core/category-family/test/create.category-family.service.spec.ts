import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyTypeEntity } from '../../company-type/entities/company-type.entity';
import dataMock from '../../../shared/mock/category-family.mock'
import { CategoryFamilyEntity, CategoryFamilyRepositoryFake } from '../entities/category-family.entity';
import { CategoryFamilyService } from '../category-family.service';


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

  describe('create', () => {

    it('throws an error no data provided', async () => {
      const emptyFamily: CompanyTypeEntity = new CompanyTypeEntity();

      try {
        await service.create(emptyFamily);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('throws an error when data allready exist', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);

      try {
        await service.create(dataMock);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe('Code already exist');
      }
    });


    it('should create family', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();
    });
  });




});
