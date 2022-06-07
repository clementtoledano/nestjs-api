import { Test, TestingModule } from '@nestjs/testing';

import { CompanyEntity } from '../entities/company.entity';
import { CompanyService } from '../company.service';
import companyMock from '../../../shared/mock/company.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';




describe('GetAll CompanyService', () => {
    let service: CompanyService;
    let repositoryMock: Repository<CompanyEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyService,
                {
                    provide: getRepositoryToken(CompanyEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue([]),
                        // findOneOrFail: jest.fn().mockResolvedValue({}),
                        //   findOne: jest.fn().mockResolvedValue({}),
                        //   create: jest.fn().mockReturnValue({}),
                        //   save: jest.fn(),
                        // update: jest.fn().mockResolvedValue(true),
                        // delete: jest.fn().mockResolvedValue(true),
                    },
                },],
        }).compile();

        service = module.get<CompanyService>(CompanyService);
        repositoryMock = module.get<Repository<CompanyEntity>>(getRepositoryToken(CompanyEntity));

    });

    describe('getAll', () => {
        it('should find all users', async () => {
            const companys: CompanyEntity[] = [
                companyMock,
                {
                    id: '4214532',
                    ...companyMock
                }];
            jest.spyOn(repositoryMock, 'find').mockResolvedValue(companys);

            expect(await service.findAll()).toEqual(companys);

            expect(await service.findAll()).toHaveLength(2);

            expect(repositoryMock.find).toBeCalled();

        });
    });
});