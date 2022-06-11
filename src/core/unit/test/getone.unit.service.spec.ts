import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { UnitService } from '../unit.service';
import { UnitEntity, UnitRepositoryFake } from '../entities/unit.entity';

import dataMock from '../../../shared/mock/unit.mock';


describe('GetOne UnitService', () => {
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

    describe('finding a unit', () => {
        it('throws an error when a unit doesnt exist', async () => {

            const repositoryFindOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(null);

            expect.assertions(3);

            try {
                await service.findOneByIdOrThrow(dataMock.id);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toBe('No unit found.');
            }

            expect(repositoryFindOneSpy).toHaveBeenCalledWith({
                id: dataMock.id,
            });
        });

        it('returns the found unit', async () => {

            const repositoryFindOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(dataMock);

            const result = await service.findOneByIdOrThrow(dataMock.id);

            expect(result).toBe(dataMock);
            expect(repositoryFindOneSpy).toHaveBeenCalledWith({
                id: dataMock.id,
            });
        });
    });
});