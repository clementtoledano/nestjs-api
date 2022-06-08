import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CategoryFamilyService } from '../category-family.service';
import { CategoryFamilyEntity, CategoryFamilyRepositoryFake } from '../entities/category-family.entity';

import dataMock from '../../../shared/mock/category-family.mock'



describe('GetOne CategoryFamilyService', () => {
    let service: CategoryFamilyService;
    let repository: Repository<CategoryFamilyEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryFamilyService,
                {
                    provide: getRepositoryToken(CategoryFamilyEntity),
                    useClass: CategoryFamilyRepositoryFake
                },],
        }).compile();

        service = module.get<CategoryFamilyService>(CategoryFamilyService);
        repository = module.get<Repository<CategoryFamilyEntity>>(getRepositoryToken(CategoryFamilyEntity));

    });

    describe('getOne', () => {
        it('should find one family', async () => {
            const categoryFamily: CategoryFamilyEntity = dataMock;

            jest.spyOn(repository, 'findOne').mockResolvedValue(categoryFamily);

            expect(await service.findOneByIdOrThrow(categoryFamily.id)).toEqual(categoryFamily);

            expect(repository.findOne).toBeCalled();
        });
    });
});