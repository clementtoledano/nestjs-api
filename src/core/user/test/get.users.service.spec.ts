import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { RoleEnum } from '../../role/role.enum';
import { StatusEnum } from '../../status/status.enum';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';


import userMock from './user.mock';


describe('GetUserService', () => {
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

    describe('findAll', () => {
        it('should find all users', async () => {
            const users: UserEntity[] = [
                userMock,
                {
                    id: '45645664',
                    firstname: 'andrew',
                    lastname: 'tol',
                    email: 'andrew.tol@example.com',
                    password: 'azeaze',
                    companyName: '1001refssss',
                    sirenNumber: 789456421,
                    phone: 66666666,
                    role: {
                        id: RoleEnum.revendeur,
                        name: 'Revendeur',
                    },
                    status: {
                        id: StatusEnum.active,
                        name: 'Active',
                    },
                    newsletter: false,
                    hashPassword: function (): Promise<void> {
                        throw new Error('Function not implemented.');
                    },
                    emailToLowerCase: function (): void {
                        throw new Error('Function not implemented.');
                    }

                }];
            jest.spyOn(repositoryMock, 'find').mockResolvedValue(users);

            expect(await service.getAll()).toEqual(users);

            expect(await service.getAll()).toHaveLength(2);

            expect(repositoryMock.find).toBeCalled();

        });
    });
});