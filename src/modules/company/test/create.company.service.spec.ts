import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyEntity, CompanyRepositoryFake } from '../entities/company.entity';

import dataMock from '../../../shared/mock/company.mock';
import { CompanyService } from '../company.service';



describe('Create CompanyService', () => {
  let service: CompanyService;
  let repository: Repository<CompanyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useClass: CompanyRepositoryFake
        },],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repository = module.get<Repository<CompanyEntity>>(getRepositoryToken(CompanyEntity));

  });

  describe('create', () => {

    it('throws an error no email provided', async () => {
      const emptyUser: CompanyEntity = new CompanyEntity();

      try {
        await service.create(emptyUser);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('throws an error when code allready exist', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);

      try {
        await service.create(dataMock);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe('Code already exist');
      }
    });


    it('should create company', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
      expect(await service.create(dataMock)).toEqual(dataMock);
      expect(repository.save).toBeCalled();
    });
  });




});
