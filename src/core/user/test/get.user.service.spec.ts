import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';

import userMock from '../../../shared/mock/user.mock';


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

            jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(userMock);

            expect(await service.getOne({ id: userMock.id })).toEqual(userMock);
            expect(repositoryMock.findOne).toBeCalled();
        });
    });
});