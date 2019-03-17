import { FriendshipRequestsType } from './friendship-requests-type.enum';
import { FriendshipRequestsRepository } from './friendship-requests.repository';
import { FriendshipRequest } from './friendship-request.interface';
import { CreateRequestDto } from './dto/create-request.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.interface';
export declare class FriendshipRequestsService {
    private readonly friendshipRequestsRepository;
    private readonly usersService;
    constructor(friendshipRequestsRepository: FriendshipRequestsRepository, usersService: UsersService);
    private checkIsValidOwner;
    findMany(userId: number, type: FriendshipRequestsType): Promise<FriendshipRequest[]>;
    findOne(id: string): Promise<FriendshipRequest | null>;
    findOneBySenderId(senderId: string): Promise<FriendshipRequest | null>;
    createOne(senderId: string, dto: CreateRequestDto): Promise<FriendshipRequest>;
    deleteOne(id: string, userId: string): Promise<void>;
    acceptOne(id: string, userId: string): Promise<User>;
}
