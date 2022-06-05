import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { RoleEnum } from '../../role/role.enum';
import { StatusEnum } from '../../status/status.enum';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { BadRequestException, HttpException } from '@nestjs/common';

describe('CreateUserService', () => {
    let service: UserService;
    let repositoryMock: Repository<UserEntity>;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue([]),
                        findOneOrFail: jest.fn().mockResolvedValue({}),
                        findOne: jest.fn().mockResolvedValue({}),
                        create: jest.fn().mockReturnValue({}),
                        save: jest.fn(),
                        update: jest.fn().mockResolvedValue(true),
                        delete: jest.fn().mockResolvedValue(true),
                    },
                },
                {
                    provide: AuthService,
                    useValue: AuthService
                }
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repositoryMock = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    });

    describe('create a user', () => {
        const user: UserEntity = {
            id: '123123123',
            firstname: 'clem',
            lastname: 'tol',
            email: 'clemtol@example.com',
            password: 'secret',
            companyName: '1001ref',
            sirenNumber: 9875987,
            phone: 75555555,
            role: {
                id: RoleEnum.producteur,
                name: 'Admin',
            },
            status: {
                id: StatusEnum.active,
                name: 'Active',
            },
            newsletter: true,
            hashPassword: function (): Promise<void> {
                throw new Error('Function not implemented.');
            },
            emailToLowerCase: function (): void {
                throw new Error('Function not implemented.');
            }
        };

        it('throws an error no email provided', async () => {
            const emptyUser: UserEntity = {
                id: '',
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                companyName: '',
                sirenNumber: 0,
                phone: 0,
                newsletter: false,
                hashPassword: function (): Promise<void> {
                    throw new Error('Function not implemented.');
                },
                emailToLowerCase: function (): void {
                    throw new Error('Function not implemented.');
                },
            };

            // expect.assertions(2);

            try {
                await service.create(emptyUser);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
                expect(e.message).toBe('Email is needed');
            }
        });

        it('throws an error when email allready exist', async () => {
            jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(user);

            try {
                await service.create(user);
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.message).toBe('Email is already in use');
            }
        });

        it('should create user', async () => {

            jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(user);
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);

            expect(await service.create(user)).toEqual(user);
            expect(repositoryMock.save).toBeCalled();
            expect(repositoryMock.findOne).toHaveBeenCalledWith({ email: user.email });
        });
    });
});
