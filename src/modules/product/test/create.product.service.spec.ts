import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { ProductEntity, ProductRepositoryFake } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/product.mock';
import { ProductService } from '../product.service';



describe('Create ProductService', () => {
  let service: ProductService;
  let repository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: ProductRepositoryFake
        },],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));

  });

  describe('create', () => {

    it('throws an error no name provided', async () => {
      const emptyUser: ProductEntity = new ProductEntity();

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


    it('should create product', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();
    });
  });




});
