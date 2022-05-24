import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetUserByLoginService } from './get.user.by.login.service';
import { User } from '../entities/user.entity';
import { RoleEnum } from '../../roles/roles.enum';
import { StatusEnum } from '../../statuses/statuses.enum';
import * as bcrypt from 'bcrypt';


describe('GetUserByLoginService', () => {
    let service: GetUserByLoginService;
    let repositoryMock: Repository<User>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                GetUserByLoginService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();
        service = app.get<GetUserByLoginService>(GetUserByLoginService);
        repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('find By login', () => {
        // jest.fn(comparePasswords).mockResolvedValue(true);

        it('should find user by login', async () => {
            const user: User = {
                id: '123123123',
                firstname: 'clem',
                lastname: 'tol',
                email: 'clem.tol@example.com',
                password: '$2a$15$sf5Aa/Xdr8cmsEQzsSxq7uAATnUG.HWyXZPc3lMtbWRDl05F7XdW2',
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
                async hashPassword(): Promise<any> {
                    this.password = await bcrypt.hash(this.password, 10)
                }

            };
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);

            expect(await service.getByLogin({ email: user.email, password: 'password123' })).toEqual(user);
            // expect(repositoryMock.findOne({ email: user.email })).toBeCalled();

        });
    });
});