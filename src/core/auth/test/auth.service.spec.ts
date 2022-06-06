import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';

import userMock from '../../user/test/user.mock'


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userMock),
          }
          ,
        },
      ],

    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('throw an error', async () => {

    try {
      await service.validateUser({ exp: 0, iat: 0, user: userMock })

    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Invalid token');
    }

    expect(service).toBeDefined();
  });

  it('should be validate user', async () => {

    expect(await service.validateUser({ exp: 0, iat: 0, user: userMock })).toEqual(userMock);

    expect(service).toBeDefined();

  });







});
