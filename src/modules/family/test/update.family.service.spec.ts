import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FamilyService } from '../family.service';
import { FamilyEntity, FamilyRepositoryFake } from '../entities/family.entity';
import dataMock from '../../../shared/mock/family.mock';

describe('Create FamilyService', () => {
    let service: FamilyService;
    let repository: Repository<FamilyEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FamilyService,
                {
                    provide: getRepositoryToken(FamilyEntity),
                    useClass: FamilyRepositoryFake,
                },
            ],
        }).compile();

        service = module.get<FamilyService>(FamilyService);
        repository = module.get<Repository<FamilyEntity>>(getRepositoryToken(FamilyEntity));
    });

    describe('update family throw errors', () => {
        const emptyFamily: FamilyEntity = new FamilyEntity();

        it('throws an error no data provided', async () => {
            try {
                await service.update(emptyFamily.id, emptyFamily);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
            }
        });

        it('throws an error when no id', async () => {
            try {
                await service.update(dataMock.id, dataMock);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
            }
        });

        it('throws an error no family data provided', async () => {
            try {
                await service.update(emptyFamily.id, emptyFamily);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
            }
        });

        it('throws an error when no family id', async () => {
            try {
                await service.update(dataMock.id, dataMock);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
            }
        });
    });

    it('should update family', async () => {
        const name = 'nouveau nom';

        const newFamily: FamilyEntity = {
            ...dataMock,
            name,
        };
        const savedFamily = { ...newFamily };

        const familyServiceFindOneByIdOrThrowSpy = jest.spyOn(service, 'findOneByIdOrThrow').mockResolvedValue(dataMock);

        const familyRepositoryCreateSpy = jest.spyOn(repository, 'create').mockReturnValue(newFamily);

        const familyRepositorySaveSpy = jest.spyOn(repository, 'save').mockResolvedValue(savedFamily);

        const result = await service.update(newFamily.id, newFamily);

        expect(familyServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(newFamily.id);

        expect(familyRepositoryCreateSpy).toHaveBeenCalledWith({
            ...dataMock,
            name,
        });

        expect(familyRepositorySaveSpy).toHaveBeenCalledWith(newFamily);
        expect(result).toEqual(savedFamily);
    });
});
