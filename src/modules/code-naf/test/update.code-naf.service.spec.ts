import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeNafService } from '../code-naf.service';
import { CodeNafEntity, CodeNafRepositoryFake } from '../entities/code-naf.entity';

import dataMock from '../../../shared/mock/codeNaf.mock';

describe('Update CodeNafService', () => {
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

  it('throws an error no data provided', async () => {
    const { id, ...emptyCompany }: CodeNafEntity = new CodeNafEntity();

    try {
      await service.update(id, emptyCompany);
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


  it('should update codeNaf', async () => {
    const name = 'Blabla Bli';

    const newCodeNaf: CodeNafEntity = {
      ...dataMock,
      name,
    }

    const savedCompany = { ...newCodeNaf }


    const codeNafServiceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const codeNafRepositoryCreateSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue(newCodeNaf);

    const codeNafRepositorySaveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue(savedCompany);


    const result = await service.update(newCodeNaf.id, newCodeNaf);

    expect(codeNafServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      newCodeNaf.id,
    );

    expect(codeNafRepositoryCreateSpy).toHaveBeenCalledWith({
      ...dataMock,
      name,
    });

    expect(codeNafRepositorySaveSpy).toHaveBeenCalledWith(newCodeNaf);
    expect(result).toEqual(savedCompany);

  });
});




