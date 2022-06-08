import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


import dataMock from '../../../shared/mock/category-family.mock'
import { CategoryFamilyService } from '../category-family.service';
import { CategoryFamilyEntity, CategoryFamilyRepositoryFake } from '../entities/category-family.entity';


describe('GetAll CompanyTypeService', () => {
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

    describe('findAll', () => {
        it('should find all families', async () => {
            const companyTypes: CategoryFamilyEntity[] = [
                dataMock,
                {
                    id: '52164d3b-7a01-44cc-aeb3-68c385b91cde',
                    name: 'Famille'
                }];

            jest.spyOn(repository, 'find').mockResolvedValue(companyTypes);

            expect(await service.findAll()).toEqual(companyTypes);

            expect(await service.findAll()).toHaveLength(2);

            expect(repository.find).toBeCalled();

        });
    });
});