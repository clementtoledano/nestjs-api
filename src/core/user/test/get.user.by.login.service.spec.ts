import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';
import { RoleEnum } from '../../role/role.enum';
import { StatusEnum } from '../../status/status.enum';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { HttpException } from '@nestjs/common';

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

        const user: UserEntity = {
            id: '123123123',
            firstname: 'clem',
            lastname: 'tol',
            email: 'clem.tol@example.com',
            password: '$2a$15$sf5Aa/Xdr8cmsEQzsSxq7uAATnUG.HWyXZPc3lMtbWRDl05F7XdW2',
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
            async hashPassword(): Promise<any> {
                this.password = await bcrypt.hash(this.password, 10);
            },
            emailToLowerCase: function (): void {
                throw new Error('Function not implemented.');
            }
        };


        it('throw exeption when no email', async () => {
            try {
                await service.getByLogin({ email: '', password: '' });
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.message).toBe('User not found');
            }
        })

        it('throw exeption when no password', async () => {
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);

            try {
                await service.getByLogin({ email: user.email, password: '' });
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
                expect(e.message).toBe('Login was not successfull, wrong credentials');
            }
        })

        it('should find user by login', async () => {

            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);
            jest.spyOn(authService, 'comparePasswords').mockResolvedValueOnce({ email: user.email, password: 'password123' });

            expect(await service.getByLogin({ email: user.email, password: 'password123' })).toEqual(user);
            expect(authService.comparePasswords).toBeCalled();
            expect(repositoryMock.findOne).toBeCalled();

        });
    });
});