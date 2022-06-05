import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { RoleEnum } from '../../role/role.enum';
import { StatusEnum } from '../../status/status.enum';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';

describe('UserService', () => {
    let service: UserService;
    let repositoryMock: Repository<UserEntity>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue({}),
                    }
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

    describe('findById', () => {
        it('should find user by id', async () => {
            const user: UserEntity = {
                id: '123123123',
                firstname: 'clem',
                lastname: 'tol',
                email: 'clem.tol@example.com',
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
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);

            expect(await service.getOne({ id: user.id })).toEqual(user);
            expect(repositoryMock.findOne).toBeCalled();
        });
    });
});