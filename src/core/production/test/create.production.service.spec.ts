import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { ProductionEntity, ProductionRepositoryFake } from '../entities/production.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/production.mock';
import { ProductionService } from '../production.service';



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

  describe('create', () => {

    it('throws an error no name provided', async () => {
      const emptyUser: ProductionEntity = new ProductionEntity();

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


    it('should create production', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();
    });
  });




});
