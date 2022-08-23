import { Test, TestingModule } from '@nestjs/testing';

import { FilterEntity, FilterRepositoryFake } from '../entities/filter.entity';
import { FilterService } from '../filter.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/filter.mock';



describe('GetAll FilterService', () => {
    let service: FilterService;
    let repository: Repository<FilterEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FilterService,
                {
                    provide: getRepositoryToken(FilterEntity),
                    useClass: FilterRepositoryFake
                },],
        }).compile();

        service = module.get<FilterService>(FilterService);
        repository = module.get<Repository<FilterEntity>>(getRepositoryToken(FilterEntity));

    });

    describe('getAll', () => {
        it('should find all filters', async () => {
            const filters: FilterEntity[] = [
                dataMock,
                {
                    ...dataMock,
                    id: '4214532'
                }];
            jest.spyOn(repository, 'find').mockResolvedValue(filters);

            expect(await service.findAll()).toEqual(filters);

            expect(await service.findAll()).toHaveLength(2);

            expect(repository.find).toBeCalled();

        });
    });
});