import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { HttpException } from '@nestjs/common';

import userMock from './user.mock';

describe('UserService', () => {
    let service: UserService;
    let authService: AuthService;
    let repositoryMock: Repository<UserEntity>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(null),
                    }
                },
                {
                    provide: AuthService,
                    useValue: {
                        comparePasswords: jest.fn().mockResolvedValue(null),
                    }
                }
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        service = module.get<UserService>(UserService);
        repositoryMock = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    });


    describe('find By login', () => {

        it('throw exeption when no email', async () => {
            try {
                await service.getByLogin({ email: '', password: '' });
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.message).toBe('User not found');
            }
        })

        it('throw exeption when no password', async () => {
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(userMock);

            try {
                await service.getByLogin({ email: userMock.email, password: '' });
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.message).toBe('Login was not successfull, wrong credentials');
            }
        })

        it('should find user by login', async () => {

            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(userMock);
            jest.spyOn(authService, 'comparePasswords').mockResolvedValueOnce({ email: userMock.email, password: 'password123' });

            expect(await service.getByLogin({ email: userMock.email, password: 'password123' })).toEqual(userMock);
            expect(authService.comparePasswords).toBeCalled();
            expect(repositoryMock.findOne).toBeCalled();

        });
    });
});