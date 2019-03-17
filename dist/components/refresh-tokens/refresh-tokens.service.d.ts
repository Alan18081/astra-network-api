import { JwtService } from '@nestjs/jwt';
import { CreateRefreshTokenInterface } from './interfaces/create-refresh-token.interface';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { RefreshToken } from './refresh-token.interface';
export declare class RefreshTokensService {
    private readonly refreshTokensRepository;
    private readonly jwtService;
    constructor(refreshTokensRepository: RefreshTokensRepository, jwtService: JwtService);
    findOneByUserId(userId: string): Promise<RefreshToken | null>;
    findOneByToken(token: string): Promise<RefreshToken | null>;
    createOne(payload: CreateRefreshTokenInterface): Promise<RefreshToken>;
    deleteOne(id: string): Promise<void>;
}
