import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeNafService } from '../code-naf.service';
import { CodeNafEntity, CodeNafRepositoryFake } from '../entities/code-naf.entity';

import dataMock from '../../../shared/mock/codeNaf.mock';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('throws an error no data provided', async () => {
    const { id, ...emptyType }: CodeNafEntity = new CodeNafEntity();

    try {
      await service.update(id, emptyType);
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


  it('should create company type', async () => {

    const newCodeNaf: CodeNafEntity = {
      id: dataMock.id,
      code: 'XXXX',
      name: 'blabla',
    }

    const { id, code, name } = newCodeNaf

    jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
    expect(await service.update(id, { code, name })).toEqual(dataMock);
    expect(repository.save).toBeCalled();
    expect(repository.create).toBeCalled();
  });
});




