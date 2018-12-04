import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../../../helpers/test-helpers/mock-repository';
import { RefreshTokensService } from '../refresh-tokens.service';
import { RefreshToken } from '../refresh-token.entity';
import { CreateRefreshTokenInterface } from '../interfaces/create-refresh-token.interface';

describe('UserHashesService', () => {
  let refreshTokensService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [RefreshTokensService, { provide: getRepositoryToken(RefreshToken), useValue: mockRepository }]
    }).compile();

    refreshTokensService = module.get<RefreshTokensService>(RefreshTokensService);
  });

  describe('findOneByUserId', () => {
    it('should find token and returns it', async () => {
      const userId = 10;

      const result = {
        ...new RefreshToken(),
        userId: payload.userId,
        token: 'Some refresh token'
      };

      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);

      expect(await refreshTokensService.findOneByUserId(userId)).toEqual(result);
    });
  });

  describe('findOneByToken', () => {
    it('should find token and returns it', async () => {
      const token = 'Some refresh token';

      const result = {
        ...new RefreshToken(),
        userId: payload.userId,
        token: 'Some refresh token'
      };

      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);

      expect(await refreshTokensService.findOneByToken(token)).toEqual(result);
    });
  });

  describe('createOne', () => {
    it('should create new refresh token and return it', async () => {
      const payload: CreateRefreshTokenInterface = {
        userId: 5,
        accessToken: 'Some access token'
      };

      const result = {
        ...new RefreshToken(),
        userId: payload.userId,
        token: 'Some refresh token'
      };


      jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);

      expect(await refreshTokensService.createOne()).toEqual(result);
    });
  });

});