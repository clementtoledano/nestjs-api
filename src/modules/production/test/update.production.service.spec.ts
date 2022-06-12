import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ProductionService } from '../production.service';
import { ProductionEntity, ProductionRepositoryFake } from '../entities/production.entity';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


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

        },],
    }).compile();

    service = module.get<ProductionService>(ProductionService);
    repository = module.get<Repository<ProductionEntity>>(getRepositoryToken(ProductionEntity));

  });


  it('throws an error no data provided', async () => {
    const { id, ...emptyProduction }: ProductionEntity = new ProductionEntity();

    try {
      await service.update(id, emptyProduction);
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


  it('should update prodction', async () => {
    const name = 'vin';

    const newProduction: ProductionEntity = {
      ...dataMock,
      name
    }
    const savedProduction = { ...newProduction }


    const prodctionServiceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const prodctionRepositoryCreateSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(newProduction);

    const prodctionRepositorySaveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(savedProduction);


    const result = await service.update(newProduction.id, newProduction);

    expect(prodctionServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      newProduction.id,
    );

    expect(prodctionRepositoryCreateSpy).toHaveBeenCalledWith({
      ...dataMock,
      name,
    });

    expect(prodctionRepositorySaveSpy).toHaveBeenCalledWith(newProduction);
    expect(result).toEqual(savedProduction);

  });
});




