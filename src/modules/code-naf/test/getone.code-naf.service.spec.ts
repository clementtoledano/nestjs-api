import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodeNafEntity, CodeNafRepositoryFake } from '../entities/code-naf.entity';
import { CodeNafService } from '../code-naf.service';
import companyTypeMock from '../../../shared/mock/codeNaf.mock';




describe('GetOne CodeNafService', () => {
    let service: CodeNafService;
    let repository: Repository<CodeNafEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CodeNafService,
                {
                    provide: getRepositoryToken(CodeNafEntity),
                    useClass: CodeNafRepositoryFake

                },],
        }).compile();

        service = module.get<CodeNafService>(CodeNafService);
        repository = module.get<Repository<CodeNafEntity>>(getRepositoryToken(CodeNafEntity));

    });

    describe('getOne', () => {
        it('should find one user', async () => {
            const companyType: CodeNafEntity = companyTypeMock;

            jest.spyOn(repository, 'findOne').mockResolvedValue(companyType);

            expect(await service.findOneByIdOrThrow(companyType.id)).toEqual(companyType);

            expect(repository.findOne).toBeCalled();
        });
    });
});