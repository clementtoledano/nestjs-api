import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductService } from '../product.service';
import { ProductEntity, ProductRepositoryFake } from '../entities/product.entity';



import dataMock from '../../../shared/mock/product.mock';

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


  it('throws an error no data provided', async () => {
    const { id, ...emptyProduct }: ProductEntity = new ProductEntity();

    try {
      await service.update(id, emptyProduct);
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


  it('should update product', async () => {
    const name = 'vin';

    const newProduct: ProductEntity = {
      ...dataMock,
      name
    }
    const savedProduct = { ...newProduct }


    const productServiceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const productRepositoryCreateSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(newProduct);

    const productRepositorySaveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(savedProduct);


    const result = await service.update(newProduct.id, newProduct);

    expect(productServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      newProduct.id,
    );

    expect(productRepositoryCreateSpy).toHaveBeenCalledWith({
      ...dataMock,
      name,
    });

    expect(productRepositorySaveSpy).toHaveBeenCalledWith(newProduct);
    expect(result).toEqual(savedProduct);

  });
});

