import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeNafService } from '../code-naf.service';
import { CodeNafEntity, CodeNafRepositoryFake } from '../entities/code-naf.entity';
import companyTypeMock from '../../../shared/mock/codeNaf.mock';



describe('Create CodeNafService', () => {
  let service: CodeNafService;
  let repository: Repository<CodeNafEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodeNafService,
        {
          provide: getRepositoryToken(CodeNafEntity),
          useClass: CodeNafRepositoryFake
        },],
    }).compile();

    service = module.get<CodeNafService>(CodeNafService);
    repository = module.get<Repository<CodeNafEntity>>(getRepositoryToken(CodeNafEntity));

  });


  describe('create', () => {

    it('throws an error no email provided', async () => {
      const emptyUser: CodeNafEntity = new CodeNafEntity();

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
