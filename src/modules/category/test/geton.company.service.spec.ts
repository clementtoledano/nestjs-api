import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CategoryService } from '../category.service';
import { CategoryEntity, CategoryRepositoryFake } from '../entities/category.entity';

import dataMock from '../../../shared/mock/category.mock';


describe('GetOne CategoryService', () => {
    let service: CategoryService;
    let repository: Repository<CategoryEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
                {
                    provide: getRepositoryToken(CategoryEntity),
                    useClass: CategoryRepositoryFake
                },],
        }).compile();

        service = module.get<CategoryService>(CategoryService);
        repository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));

    });

    describe('finding a category', () => {
        it('throws an error when a category doesnt exist', async () => {

            const repositoryFindOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(null as any);

            expect.assertions(3);

            try {
                await service.findOneByIdOrThrow(dataMock.id);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toBe('No category found.');
            }

            expect(repositoryFindOneSpy).toHaveBeenCalledWith({
                id: dataMock.id,
            });
        });

        it('returns the found category', async () => {

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