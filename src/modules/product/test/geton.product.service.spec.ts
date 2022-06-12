import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { ProductService } from '../product.service';
import { ProductEntity, ProductRepositoryFake } from '../entities/product.entity';

import dataMock from '../../../shared/mock/product.mock';


describe('GetOne ProductService', () => {
    let service: ProductService;
    let repository: Repository<ProductEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(ProductEntity),
                    useClass: ProductRepositoryFake
                },],
        }).compile();

        service = module.get<ProductService>(ProductService);
        repository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));

    });

    describe('finding a product', () => {
        it('throws an error when a product doesnt exist', async () => {

            const repositoryFindOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(null as any);

            expect.assertions(3);

            try {
                await service.findOneByIdOrThrow(dataMock.id);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toBe('No product found.');
            }

            expect(repositoryFindOneSpy).toHaveBeenCalledWith({
                id: dataMock.id,
            });
        });

        it('returns the found product', async () => {

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