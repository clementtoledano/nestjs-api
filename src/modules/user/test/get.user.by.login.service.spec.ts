import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRepositoryFake } from '../entities/user.entity';

import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { HttpException, NotFoundException } from '@nestjs/common';

import dataMock from '../../../shared/mock/user.mock';

describe('UserService', () => {
    let service: UserService;
    let authService: AuthService;
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
                    useValue: {
                        comparePasswords: jest.fn().mockResolvedValue(null as any),
                    }
                }
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        service = module.get<UserService>(UserService);
        repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    });


    describe('find By login', () => {

        it('throw exeption when no email', async () => {
            try {
                await service.getByLogin({ email: '', password: '' });
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toBe('User not found');
            }
        })

        it('throw exeption when no password', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValueOnce(dataMock);

            try {
                await service.getByLogin({ email: dataMock.email, password: '' });
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.message).toBe('Login was not successfull, wrong credentials');
            }
        })

        it('should find user by login', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValueOnce(dataMock);
            jest.spyOn(authService, 'comparePasswords').mockResolvedValueOnce({ email: dataMock.email, password: 'password123' });
            expect(await service.getByLogin({ email: dataMock.email, password: 'password123' })).toEqual(dataMock);
            expect(authService.comparePasswords).toBeCalled();
            expect(repository.findOne).toBeCalled();
        });
    });
});