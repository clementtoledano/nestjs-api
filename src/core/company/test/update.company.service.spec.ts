import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyService } from '../company.service';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyTypeEntity } from 'src/core/company-type/entities/company-type.entity';
import { UserEntity } from 'src/core/user/entities/user.entity';

import companyMock from '../../../shared/mock/company.mock';

describe('Create CompanyService', () => {
  let service: CompanyService;
  let repositoryMock: Repository<CompanyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: {
            // find: jest.fn().mockResolvedValue([]),
            // findOneOrFail: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockReturnValue({}),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            // delete: jest.fn().mockResolvedValue(true),
          },
        },],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repositoryMock = module.get<Repository<CompanyEntity>>(getRepositoryToken(CompanyEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('throws an error no data provided', async () => {
    const { id, ...emptyCompany }: CompanyEntity = new CompanyEntity();

    try {
      await service.update(id, emptyCompany);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });

  it('throws an error when no id', async () => {

    try {
      await service.update(companyMock.id, companyMock);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });


//   it('should update company ', async () => {
    

// // const { id, ...companyMock }: CompanyEntity = companyMock;

//     jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(companyMock);
//     const newCompany: CompanyEntity = {
//       id: '',
//       address: '20 rue du chateau',
//       label: '',
//       description: '',
//       siretNumber: '',
//       city: '',
//       region: '',
//       zipcode: '',
//       country: '',
//       phone: '',
//       email: '',
//       user: new UserEntity,
//       companyType: new CompanyTypeEntity
//     }

//     const { id, address, ...newCompany } = newCompany

//     expect(await service.update(id, { address, ...companyMock })).toEqual(companyMock);
//     expect(repositoryMock.save).toBeCalled();
//     expect(repositoryMock.create).toBeCalled();
//   });
});




