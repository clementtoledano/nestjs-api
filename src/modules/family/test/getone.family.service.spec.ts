import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FamilyService } from '../family.service';
import { FamilyEntity, FamilyRepositoryFake } from '../entities/family.entity';

import dataMock from '../../../shared/mock/family.mock'



describe('GetOne FamilyService', () => {
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

    describe('getOne', () => {
        it('should find one family', async () => {
            const family: FamilyEntity = dataMock;

            jest.spyOn(repository, 'findOne').mockResolvedValue(family);

            expect(await service.findOneByIdOrThrow(family.id)).toEqual(family);

            expect(repository.findOne).toBeCalled();
        });
    });
});