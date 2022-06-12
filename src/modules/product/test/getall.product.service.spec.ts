import { Test, TestingModule } from '@nestjs/testing';

import { ProductEntity, ProductRepositoryFake } from '../entities/product.entity';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/product.mock';



describe('GetAll ProductService', () => {
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

    describe('getAll', () => {
        it('should find all categories', async () => {
            const products: ProductEntity[] = [
                dataMock,
                {
                    ...dataMock,
                    id: '4214532'
                }];
            jest.spyOn(repository, 'find').mockResolvedValue(products);

            expect(await service.findAll()).toEqual(products);

            expect(await service.findAll()).toHaveLength(2);

            expect(repository.find).toBeCalled();

        });
    });
});