import { BaseRepository } from '../core/base.repository';
import { Model } from 'mongoose';
import { RefreshToken } from './refresh-token.interface';
export declare class RefreshTokensRepository extends BaseRepository<RefreshToken> {
    private readonly userHashModel;
    constructor(userHashModel: Model<RefreshToken>);
    findOneByToken(token: string): Promise<RefreshToken | null>;
    findOneByUserId(userId: string): Promise<RefreshToken | null>;
}
