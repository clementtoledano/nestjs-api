import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { FamilyService } from '../family.service';
import { FamilyEntity, FamilyRepositoryFake } from '../entities/family.entity';

import dataMock from '../../../shared/mock/family.mock'
import { getRepositoryToken } from '@nestjs/typeorm';

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


  it('should remove family', async () => {

    const serviceFindOneByIdOrThrowSpy = jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(dataMock);

    const repositoryRemoveSpy = jest
      .spyOn(repository, 'remove')
      .mockResolvedValue(null);

    const result = await service.remove(dataMock.id);

    expect(serviceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
      dataMock.id,
    );

    expect(repositoryRemoveSpy).toHaveBeenCalledWith([
      dataMock,
    ]);

    expect(result).toBe(null);

  });
});




