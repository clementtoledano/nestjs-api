import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { RoleEnum } from '../../roles/roles.enum';
import { StatusEnum } from '../../statuses/statuses.enum';
import { UsersService } from '../users.service';

describe('GetUserService', () => {
    let service: UsersService;
    let repositoryMock: Repository<User>;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = app.get<UsersService>(UsersService);
        repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('findAll', () => {
        it('should find all user', async () => {
            const users: User[] = [{
                id: '123123123',
                firstname: 'clem',
                lastname: 'tol',
                email: 'clem.tol@example.com',
                password: 'secret',
                companyName: '1001ref',
                siretNumber: 9875987,
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
                hashPassword(): any { }

            },
            {
                id: '45645664',
                firstname: 'andrew',
                lastname: 'tol',
                email: 'andrew.tol@example.com',
                password: 'azeaze',
                companyName: '1001refssss',
                siretNumber: 789456421,
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
                hashPassword(): any { }

            }];
            jest.spyOn(repositoryMock, 'find').mockResolvedValue(users);
            expect(await service.getAll()).toEqual(users);
            expect(repositoryMock.find).toBeCalled();
            expect(await service.getAll()).toHaveLength(2);
            expect(repositoryMock.find).toBeCalled();

        });
    });
});