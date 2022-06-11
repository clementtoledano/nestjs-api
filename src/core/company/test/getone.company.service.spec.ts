import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CompanyService } from '../company.service';
import { CompanyEntity, CompanyRepositoryFake } from '../entities/company.entity';

import dataMock from '../../../shared/mock/company.mock';


describe('GetOne CompanyService', () => {
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

    describe('finding a company', () => {
        it('throws an error when a company doesnt exist', async () => {

            const repositoryFindOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(null);

            expect.assertions(3);

            try {
                await service.findOneByIdOrThrow(dataMock.id);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toBe('No company found.');
            }

            expect(repositoryFindOneSpy).toHaveBeenCalledWith({
                id: dataMock.id,
            });
        });

        it('returns the found company', async () => {

            const repositoryFindOneSpy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(dataMock);

            const result = await service.findOneByIdOrThrow(dataMock.id);

            expect(result).toBe(dataMock);
            expect(repositoryFindOneSpy).toHaveBeenCalledWith({
                id: dataMock.id,
            });
        });
    });
});