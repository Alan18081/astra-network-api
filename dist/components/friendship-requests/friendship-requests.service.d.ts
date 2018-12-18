import { FriendshipRequest } from './friendship-request.entity';
import { Repository } from 'typeorm';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../core/dto/pagination.dto';
import { FriendshipRequestsType } from './friendship-requests-type.enum';
export declare class FriendshipRequestsService {
    private readonly friendshipRequestsRepository;
    constructor(friendshipRequestsRepository: Repository<FriendshipRequest>);
    findMany(userId: number, type: FriendshipRequestsType): Promise<FriendshipRequest[]>;
    findManyWithPagination(userId: number, { page, limit }: Required<PaginationDto>, type: FriendshipRequestsType): Promise<PaginatedResult<FriendshipRequest>>;
    findOne(id: number): Promise<FriendshipRequest | undefined>;
    findOneBySenderId(senderId: number): Promise<FriendshipRequest | undefined>;
    createOne(senderId: number, receiverId: number, message?: string): Promise<FriendshipRequest>;
    deleteOne(id: number): Promise<void>;
}
