import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { FilterService } from '../filter.service';
import { FilterEntity, FilterRepositoryFake } from '../entities/filter.entity';

import dataMock from '../../../shared/mock/filter.mock';


describe('GetOne FilterService', () => {
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

    describe('finding a filter', () => {
        it('throws an error when a filter doesnt exist', async () => {

            const repositoryFindOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(null as any);

            expect.assertions(3);

            try {
                await service.findOneByIdOrThrow(dataMock.id);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toBe('No filter found.');
            }

            expect(repositoryFindOneSpy).toHaveBeenCalledWith({
                id: dataMock.id,
            });
        });

        it('returns the found filter', async () => {

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