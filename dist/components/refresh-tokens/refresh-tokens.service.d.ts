import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.entity';
import { Repository } from 'typeorm';
import { CreateRefreshTokenInterface } from './interfaces/create-refresh-token.interface';
export declare class RefreshTokensService {
    private readonly refreshTokensRepository;
    private readonly jwtService;
    constructor(refreshTokensRepository: Repository<RefreshToken>, jwtService: JwtService);
    findOneByUserId(userId: number): Promise<RefreshToken | undefined>;
    findOneByToken(token: string): Promise<RefreshToken | undefined>;
    createOne(payload: CreateRefreshTokenInterface): Promise<RefreshToken>;
    deleteOne(id: number): Promise<void>;
}
