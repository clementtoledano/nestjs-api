import { Test, TestingModule } from '@nestjs/testing';

import { UnitEntity, UnitRepositoryFake } from '../entities/unit.entity';
import { UnitService } from '../unit.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/unit.mock';



describe('GetAll UnitService', () => {
    let service: UnitService;
    let repository: Repository<UnitEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UnitService,
                {
                    provide: getRepositoryToken(UnitEntity),
                    useClass: UnitRepositoryFake
                },],
        }).compile();

        service = module.get<UnitService>(UnitService);
        repository = module.get<Repository<UnitEntity>>(getRepositoryToken(UnitEntity));

    });

    describe('getAll', () => {
        it('should find all units', async () => {
            const units: UnitEntity[] = [
                dataMock,
                {
                    ...dataMock,
                    id: '4214532'
                }];
            jest.spyOn(repository, 'find').mockResolvedValue(units);

            expect(await service.findAll()).toEqual(units);

            expect(await service.findAll()).toHaveLength(2);

            expect(repository.find).toBeCalled();

        });
    });
});