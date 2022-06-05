import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { RoleEnum } from '../../role/role.enum';
import { StatusEnum } from '../../status/status.enum';
import { UserService } from '../user.service';

describe('UserService', () => {
    let service: UserService;
    let repositoryMock: Repository<User>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = app.get<UserService>(UserService);
        repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('findById', () => {
        it('should find user by id', async () => {
            const user: User = {
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
                hashPassword(): any { }

            };
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);
            expect(await service.getOne({ id: user.id })).toEqual(user);
            expect(repositoryMock.findOne).toBeCalled();
        });
    });
});