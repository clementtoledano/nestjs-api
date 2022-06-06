import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyTypeEntity } from '../entities/company-type.entity';
import { CompanyTypeService } from '../company-type.service';
import companyTypeMock from './company-type.mock';




describe('GetOne CompanyTypeService', () => {
    let service: CompanyTypeService;
    let repositoryMock: Repository<CompanyTypeEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyTypeService,
                {
                    provide: getRepositoryToken(CompanyTypeEntity),
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

        service = module.get<CompanyTypeService>(CompanyTypeService);
        repositoryMock = module.get<Repository<CompanyTypeEntity>>(getRepositoryToken(CompanyTypeEntity));

    });

    describe('getOne', () => {
        it('should find one user', async () => {
            const companyType: CompanyTypeEntity = companyTypeMock;

            jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(companyType);

            expect(await service.findOneByIdOrThrow(companyType.id)).toEqual(companyType);

            expect(repositoryMock.findOne).toBeCalled();
        });
    });
});