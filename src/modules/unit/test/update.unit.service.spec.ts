import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UnitService } from '../unit.service';
import { UnitEntity, UnitRepositoryFake } from '../entities/unit.entity';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import dataMock from '../../../shared/mock/unit.mock';

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


  it('throws an error no data provided', async () => {
    const { id, ...emptyUnit }: UnitEntity = new UnitEntity();

    try {
      await service.update(id, emptyUnit);
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


  it('should update unit', async () => {
    const name = 'pourcentage';
    const symbol = '%';

    const newUnit: UnitEntity = {
      ...dataMock,
      name,
      symbol
    }
    const savedUnit = { ...newUnit }


    const unitServiceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const unitRepositoryCreateSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(newUnit);

    const unitRepositorySaveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(savedUnit);


    const result = await service.update(newUnit.id, newUnit);

    expect(unitServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      newUnit.id,
    );

    expect(unitRepositoryCreateSpy).toHaveBeenCalledWith({
      ...dataMock,
      name,
      symbol
    });

    expect(unitRepositorySaveSpy).toHaveBeenCalledWith(newUnit);
    expect(result).toEqual(savedUnit);

  });
});




