import { Test, TestingModule } from '@nestjs/testing';

import { CategoryEntity, CategoryRepositoryFake } from '../entities/category.entity';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/category.mock';



describe('GetAll CategoryService', () => {
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

    describe('getAll', () => {
        it('should find all categories', async () => {
            const categorys: CategoryEntity[] = [
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