import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { ValueEntity, ValueRepositoryFake } from '../entities/value.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/value.mock';
import { ValueService } from '../value.service';



describe('Create ValueService', () => {
  let service: ValueService;
  let repository: Repository<ValueEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValueService,
        {
          provide: getRepositoryToken(ValueEntity),
          useClass: ValueRepositoryFake
        },],
    }).compile();

    service = module.get<ValueService>(ValueService);
    repository = module.get<Repository<ValueEntity>>(getRepositoryToken(ValueEntity));

  });

  describe('create', () => {

    it('throws an error no name provided', async () => {
      const emptyUser: ValueEntity = new ValueEntity();

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


    it('should create value', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();
    });
  });




});
