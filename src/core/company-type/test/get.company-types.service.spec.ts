import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyTypeEntity } from '../../company-type/entities/company-type.entity';
import { CompanyTypeService } from '../../company-type/company-type.service';
import companyTypeMock from '../../../shared/mock/company-type.mock';




describe('GetAll CompanyTypeService', () => {
    let service: CompanyTypeService;
    let repositoryMock: Repository<CompanyTypeEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyTypeService,
                {
                    provide: getRepositoryToken(CompanyTypeEntity),
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

        service = module.get<CompanyTypeService>(CompanyTypeService);
        repositoryMock = module.get<Repository<CompanyTypeEntity>>(getRepositoryToken(CompanyTypeEntity));

    });

    describe('findAll', () => {
        it('should find all users', async () => {
            const companyTypes: CompanyTypeEntity[] = [
                companyTypeMock,
                {
                    id: '321321321',
                    code: '1234E',
                    name: 'Test'


                }];
            jest.spyOn(repositoryMock, 'find').mockResolvedValue(companyTypes);

            expect(await service.findAll()).toEqual(companyTypes);

            expect(await service.findAll()).toHaveLength(2);

            expect(repositoryMock.find).toBeCalled();

        });
    });
});