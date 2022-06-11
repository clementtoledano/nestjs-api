import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { FilterEntity, FilterRepositoryFake } from '../entities/filter.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/filter.mock';
import { FilterService } from '../filter.service';



describe('Create FilterService', () => {
  let service: FilterService;
  let repository: Repository<FilterEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterService,
        {
          provide: getRepositoryToken(FilterEntity),
          useClass: FilterRepositoryFake
        },],
    }).compile();

    service = module.get<FilterService>(FilterService);
    repository = module.get<Repository<FilterEntity>>(getRepositoryToken(FilterEntity));

  });


  describe('create', () => {

    it('throws an error no name provided', async () => {
      const emptyUser: FilterEntity = new FilterEntity();

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


    it('should create filter', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);

      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();


    });
  });




});
