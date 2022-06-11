import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { FilterService } from '../filter.service';
import { FilterEntity, FilterRepositoryFake } from '../entities/filter.entity';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import dataMock from '../../../shared/mock/filter.mock';

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


  it('throws an error no data provided', async () => {
    const { id, ...emptyFilter }: FilterEntity = new FilterEntity();

    try {
      await service.update(id, emptyFilter);
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


  it('should update filter', async () => {
    const name = 'pourcentage';
    const symbol = '%';

    const newFilter: FilterEntity = {
      ...dataMock,
      name,
    }
    const savedFilter = { ...newFilter }


    const filterServiceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const filterRepositoryCreateSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(newFilter);

    const filterRepositorySaveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(savedFilter);


    const result = await service.update(newFilter.id, newFilter);

    expect(filterServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      newFilter.id,
    );

    expect(filterRepositoryCreateSpy).toHaveBeenCalledWith({
      ...dataMock,
      name,
    });

    expect(filterRepositorySaveSpy).toHaveBeenCalledWith(newFilter);
    expect(result).toEqual(savedFilter);

  });
});




