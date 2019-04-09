import { BaseRepository } from '../core/base.repository';
import { UserHash } from './user-hash.interface';
import { Model } from 'mongoose';
export declare class UserHashesRepository extends BaseRepository<UserHash> {
    constructor(userHashModel: Model<UserHash>);
    findOneByHash(hash: string): Promise<UserHash | null>;
}
