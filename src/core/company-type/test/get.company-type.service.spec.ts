import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyTypeEntity, CompanyTypeRepositoryFake } from '../../company-type/entities/company-type.entity';
import { CompanyTypeService } from '../../company-type/company-type.service';
import companyTypeMock from '../../../shared/mock/company-type.mock';




describe('GetOne CompanyTypeService', () => {
    let service: CompanyTypeService;
    let repository: Repository<CompanyTypeEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyTypeService,
                {
                    provide: getRepositoryToken(CompanyTypeEntity),
                    useClass: CompanyTypeRepositoryFake

                },],
        }).compile();

        service = module.get<CompanyTypeService>(CompanyTypeService);
        repository = module.get<Repository<CompanyTypeEntity>>(getRepositoryToken(CompanyTypeEntity));

    });

    describe('getOne', () => {
        it('should find one user', async () => {
            const companyType: CompanyTypeEntity = companyTypeMock;

            jest.spyOn(repository, 'findOne').mockResolvedValue(companyType);

            expect(await service.findOneByIdOrThrow(companyType.id)).toEqual(companyType);

            expect(repository.findOne).toBeCalled();
        });
    });
});