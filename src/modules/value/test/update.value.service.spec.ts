import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ValueService } from '../value.service';
import { ValueEntity, ValueRepositoryFake } from '../entities/value.entity';



import dataMock from '../../../shared/mock/value.mock';

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


  it('throws an error no data provided', async () => {
    const { id, ...emptyValue }: ValueEntity = new ValueEntity();

    try {
      await service.update(id, emptyValue);
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


  it('should update value', async () => {
    const value = 'blonde';

    const newValue: ValueEntity = {
      ...dataMock,
      value
    }
    const savedValue = { ...newValue }


    const valueServiceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const valueRepositoryCreateSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(newValue);

    const valueRepositorySaveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(savedValue);


    const result = await service.update(newValue.id, newValue);

    expect(valueServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      newValue.id,
    );

    expect(valueRepositoryCreateSpy).toHaveBeenCalledWith({
      ...dataMock,
      value,
    });

    expect(valueRepositorySaveSpy).toHaveBeenCalledWith(newValue);
    expect(result).toEqual(savedValue);

  });
});

