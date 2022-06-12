import { Test, TestingModule } from '@nestjs/testing';

import { ProductionEntity, ProductionRepositoryFake } from '../entities/production.entity';
import { ProductionService } from '../production.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/production.mock';



describe('GetAll ProductionService', () => {
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

    describe('getAll', () => {
        it('should find all productions', async () => {
            const categorys: ProductionEntity[] = [
                dataMock,
                {
                    ...dataMock,
                    id: '4214532'
                }];
            jest.spyOn(repository, 'find').mockResolvedValue(categorys);

            expect(await service.findAll()).toEqual(categorys);

            expect(await service.findAll()).toHaveLength(2);

            expect(repository.find).toBeCalled();

        });
    });
});