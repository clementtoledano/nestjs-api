import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { UnitEntity, UnitRepositoryFake } from '../entities/unit.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/unit.mock';
import { UnitService } from '../unit.service';



describe('Create UnitService', () => {
  let service: UnitService;
  let repository: Repository<UnitEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitService,
        {
          provide: getRepositoryToken(UnitEntity),
          useClass: UnitRepositoryFake
        },],
    }).compile();

    service = module.get<UnitService>(UnitService);
    repository = module.get<Repository<UnitEntity>>(getRepositoryToken(UnitEntity));

  });


  describe('create', () => {

    it('throws an error no name provided', async () => {
      const emptyUser: UnitEntity = new UnitEntity();

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


    it('should create unit', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);

      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();


    });
  });




});
