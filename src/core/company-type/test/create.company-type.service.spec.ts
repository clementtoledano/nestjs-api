import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyTypeService } from '../../company-type/company-type.service';
import { CompanyTypeEntity } from '../../company-type/entities/company-type.entity';
import companyTypeMock from '../../../shared/mock/company-type.mock';



describe('Create CompanyTypeService', () => {
  let service: CompanyTypeService;
  let repository: Repository<CompanyTypeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyTypeService,
        {
          provide: getRepositoryToken(CompanyTypeEntity),
          useValue: {
            // find: jest.fn().mockResolvedValue([]),
            // findOneOrFail: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockReturnValue({}),
            save: jest.fn(),
            // update: jest.fn().mockResolvedValue(true),
            // delete: jest.fn().mockResolvedValue(true),
          },
        },],
    }).compile();

    service = module.get<CompanyTypeService>(CompanyTypeService);
    repository = module.get<Repository<CompanyTypeEntity>>(getRepositoryToken(CompanyTypeEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    it('throws an error no email provided', async () => {
      const emptyUser: CompanyTypeEntity = new CompanyTypeEntity();

      try {
        await service.create(emptyUser);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('throws an error when email allready exist', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(companyTypeMock);

      try {
        await service.create(companyTypeMock);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe('Code already exist');
      }
    });


    it('should create company type', async () => {

      jest.spyOn(repository, 'save').mockResolvedValueOnce(companyTypeMock);
      expect(await service.create(companyTypeMock)).toEqual(companyTypeMock);
      expect(repository.save).toBeCalled();
    });
  });




});
