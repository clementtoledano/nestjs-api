import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity, UserRepositoryFake } from '../entities/user.entity';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { BadRequestException, HttpException } from '@nestjs/common';

import dataMock from '../../../shared/mock/user.mock';


describe('CreateUserService', () => {
    let service: UserService;
    let repository: Repository<UserEntity>;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useClass: UserRepositoryFake
                },
                {
                    provide: AuthService,
                    useValue: AuthService
                }
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    });

    describe('create a user', () => {


        it('throws an error no email provided', async () => {
            const emptyUser: UserEntity = new UserEntity();

            try {
                await service.create(emptyUser);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
                expect(e.message).toBe('Email is needed');
            }
        });

        it('throws an error when email allready exist', async () => {
            jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);

            try {
                await service.create(dataMock);
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.message).toBe('Email is already in use');
            }
        });

        it('should create user', async () => {

            jest.spyOn(repository, 'save').mockResolvedValueOnce(dataMock);
            jest.spyOn(repository, 'findOne').mockResolvedValue(null as any);

            expect(await service.create(dataMock)).toEqual(dataMock);
            expect(repository.save).toBeCalled();
            expect(repository.findOne).toHaveBeenCalledWith({ email: dataMock.email });
        });
    });
});
