import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { ProductionService } from '../production.service';
import { ProductionEntity, ProductionRepositoryFake } from '../entities/production.entity';

import dataMock from '../../../shared/mock/production.mock';


describe('GetOne ProductionService', () => {
    let service: ProductionService;
    let repository: Repository<ProductionEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductionService,
                {
                    provide: getRepositoryToken(ProductionEntity),
                    useClass: ProductionRepositoryFake
                },],
        }).compile();

        service = module.get<ProductionService>(ProductionService);
        repository = module.get<Repository<ProductionEntity>>(getRepositoryToken(ProductionEntity));

    });

    describe('finding a production', () => {
        it('throws an error when a production doesnt exist', async () => {

            const repositoryFindOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(null as any);

            expect.assertions(3);

            try {
                await service.findOneByIdOrThrow(dataMock.id);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toBe('No production found.');
            }

            expect(repositoryFindOneSpy).toHaveBeenCalledWith({
                id: dataMock.id,
            });
        });

        it('returns the found production', async () => {

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