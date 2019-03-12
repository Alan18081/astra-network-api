import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateRefreshTokenInterface } from './interfaces/create-refresh-token.interface';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { RefreshToken } from './refresh-token.interface';

@Injectable()
export class RefreshTokensService {

  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findOneByUserId(userId: string): Promise<RefreshToken | null> {
    return await this.refreshTokensRepository.findOneByUserId(userId);
  }

  async findOneByToken(token: string): Promise<RefreshToken | null> {
    return await this.refreshTokensRepository.findOneByToken(token);
  }

  async createOne(payload: CreateRefreshTokenInterface): Promise<RefreshToken> {
    const { accessToken, userId } = payload;
    const token = this.jwtService.sign({ accessToken, userId });

    const refreshToken: Partial<RefreshToken> = {};
    refreshToken.token = token;
    refreshToken.userId = userId;

    return await this.refreshTokensRepository.save(refreshToken);
  }

  async deleteOne(id: string): Promise<void> {
    await this.refreshTokensRepository.deleteById(id);
  }

}