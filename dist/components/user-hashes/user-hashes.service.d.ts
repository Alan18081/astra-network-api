import { HashTypes } from '../../helpers/enums/hash-types.enum';
import { HashService } from '../core/services/hash.service';
import { UserHashesRepository } from './user-hashes.repository';
import { UserHash } from './user-hash.interface';
export declare class UserHashesService {
    private readonly userHashesRepository;
    private readonly hashService;
    constructor(userHashesRepository: UserHashesRepository, hashService: HashService);
    findOneByHash(hash: string): Promise<UserHash | null>;
    createOne(userId: string, type: HashTypes): Promise<UserHash>;
    deleteOne(id: string): Promise<void>;
}
