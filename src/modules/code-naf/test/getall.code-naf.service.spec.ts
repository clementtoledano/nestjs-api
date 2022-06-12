import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodeNafEntity, CodeNafRepositoryFake } from '../entities/code-naf.entity';
import { CodeNafService } from '../code-naf.service';
import codeNafMock from '../../../shared/mock/codeNaf.mock';




describe('GetAll CodeNafService', () => {
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

    describe('findAll', () => {
        it('should find all users', async () => {
            const codeNafs: CodeNafEntity[] = [
                codeNafMock,
                {
                    id: '321321321',
                    code: '1234E',
                    name: 'Test'


                }];
            jest.spyOn(repository, 'find').mockResolvedValue(codeNafs);

            expect(await service.findAll()).toEqual(codeNafs);

            expect(await service.findAll()).toHaveLength(2);

            expect(repository.find).toBeCalled();

        });
    });
});