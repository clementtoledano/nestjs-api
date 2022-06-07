import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


import companyMock from '../../../shared/mock/company.mock';
import { CompanyService } from '../company.service';
import { CompanyEntity } from '../entities/company.entity';



describe('GetOne CompanyService', () => {
    let service: CompanyService;
    let repositoryMock: Repository<CompanyEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyService,
                {
                    provide: getRepositoryToken(CompanyEntity),
                    useValue: {
                        // find: jest.fn().mockResolvedValue([]),
                        // findOneOrFail: jest.fn().mockResolvedValue({}),
                        findOne: jest.fn().mockResolvedValue({}),
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

    describe('getOne', () => {
        it('should find one user', async () => {
            const company: CompanyEntity = companyMock;

            jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(company);

            expect(await service.findOneByIdOrThrow(company.id)).toEqual(company);

            expect(repositoryMock.findOne).toBeCalled();
        });
    });
});