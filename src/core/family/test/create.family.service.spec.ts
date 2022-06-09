import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import dataMock from '../../../shared/mock/family.mock'
import { FamilyEntity, FamilyRepositoryFake } from '../entities/family.entity';
import { FamilyService } from '../family.service';


describe('Create FamilyService', () => {
  let service: FamilyService;
  let repository: Repository<FamilyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyService,
        {
          provide: getRepositoryToken(FamilyEntity),
          useClass: FamilyRepositoryFake
        },],
    }).compile();

    service = module.get<FamilyService>(FamilyService);
    repository = module.get<Repository<FamilyEntity>>(getRepositoryToken(FamilyEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    it('throws an error no data provided', async () => {
      const emptyFamily: FamilyEntity = new FamilyEntity();

      try {
        await service.create(emptyFamily);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('throws an error when data allready exist', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);

      try {
        await service.create(dataMock);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe('Code already exist');
      }
    });


    it('should create family', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();
    });
  });




});
