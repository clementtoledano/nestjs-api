import { Test, TestingModule } from '@nestjs/testing';

import { CompanyEntity, CompanyRepositoryFake } from '../entities/company.entity';
import { CompanyService } from '../company.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import dataMock from '../../../shared/mock/company.mock';



describe('GetAll CompanyService', () => {
    let service: CompanyService;
    let repository: Repository<CompanyEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyService,
                {
                    provide: getRepositoryToken(CompanyEntity),
                    useClass: CompanyRepositoryFake
                },],
        }).compile();

        service = module.get<CompanyService>(CompanyService);
        repository = module.get<Repository<CompanyEntity>>(getRepositoryToken(CompanyEntity));

    });

    describe('getAll', () => {
        it('should find all users', async () => {
            const companys: CompanyEntity[] = [
                dataMock,
                {
                    ...dataMock,
                    id: '4214532'
                }];
            jest.spyOn(repository, 'find').mockResolvedValue(companys);

            expect(await service.findAll()).toEqual(companys);

            expect(await service.findAll()).toHaveLength(2);

            expect(repository.find).toBeCalled();

        });
    });
});