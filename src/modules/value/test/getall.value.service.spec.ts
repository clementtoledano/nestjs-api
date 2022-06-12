import { Test, TestingModule } from '@nestjs/testing';

import { ValueEntity, ValueRepositoryFake } from '../entities/value.entity';
import { ValueService } from '../value.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/value.mock';



describe('GetAll ValueService', () => {
    let service: ValueService;
    let repository: Repository<ValueEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ValueService,
                {
                    provide: getRepositoryToken(ValueEntity),
                    useClass: ValueRepositoryFake
                },],
        }).compile();

        service = module.get<ValueService>(ValueService);
        repository = module.get<Repository<ValueEntity>>(getRepositoryToken(ValueEntity));

    });

    describe('getAll', () => {
        it('should find all categories', async () => {
            const values: ValueEntity[] = [
                dataMock,
                {
                    ...dataMock,
                    id: '4214532'
                }];
            jest.spyOn(repository, 'find').mockResolvedValue(values);

            expect(await service.findAll()).toEqual(values);

            expect(await service.findAll()).toHaveLength(2);

            expect(repository.find).toBeCalled();

        });
    });
});