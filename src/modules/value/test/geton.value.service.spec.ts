import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { ValueService } from '../value.service';
import { ValueEntity, ValueRepositoryFake } from '../entities/value.entity';

import dataMock from '../../../shared/mock/value.mock';


describe('GetOne ValueService', () => {
    let service: ValueService;
    let repository: Repository<ValueEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ValueService,
                {
                    provide: getRepositoryToken(ValueEntity),
                    useClass: ValueRepositoryFake
                },],
        }).compile();

        service = module.get<ValueService>(ValueService);
        repository = module.get<Repository<ValueEntity>>(getRepositoryToken(ValueEntity));

    });

    describe('finding a value', () => {
        it('throws an error when a value doesnt exist', async () => {

            const repositoryFindOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(null as any);

            expect.assertions(3);

            try {
                await service.findOneByIdOrThrow(dataMock.id);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toBe('No value found.');
            }

            expect(repositoryFindOneSpy).toHaveBeenCalledWith({
                id: dataMock.id,
            });
        });

        it('returns the found value', async () => {

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