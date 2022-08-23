import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


import dataMock from '../../../shared/mock/family.mock'
import { FamilyService } from '../family.service';
import { FamilyEntity, FamilyRepositoryFake } from '../entities/family.entity';


describe('GetAll familyervice', () => {
    let service: FamilyService;
    let repository: Repository<FamilyEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FamilyService,
                {
                    provide: getRepositoryToken(FamilyEntity),
                    useClass: FamilyRepositoryFake
                },],
        }).compile();

        service = module.get<FamilyService>(FamilyService);
        repository = module.get<Repository<FamilyEntity>>(getRepositoryToken(FamilyEntity));

    });

    describe('findAll', () => {
        it('should find all families', async () => {
            const families: FamilyEntity[] = [
                dataMock,
                {
                    id: '52164d3b-7a01-44cc-aeb3-68c385b91cde',
                    name: 'Famille'
                }];

            jest.spyOn(repository, 'find').mockResolvedValue(families);

            expect(await service.findAll()).toEqual(families);

            expect(await service.findAll()).toHaveLength(2);

            expect(repository.find).toBeCalled();

        });
    });
});