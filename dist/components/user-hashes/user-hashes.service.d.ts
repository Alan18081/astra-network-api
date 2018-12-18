import { UserHash } from './user-hash.entity';
import { Repository } from 'typeorm';
import { HashTypes } from '../../helpers/enums/hash-types.enum';
import { HashService } from '../core/services/hash.service';
export declare class UserHashesService {
    private readonly userHashesRepository;
    private readonly hashService;
    constructor(userHashesRepository: Repository<UserHash>, hashService: HashService);
    findOneByHash(hash: string): Promise<UserHash | undefined>;
    createOne(userId: number, type: HashTypes): Promise<UserHash>;
    deleteOne(id: number): Promise<void>;
}
