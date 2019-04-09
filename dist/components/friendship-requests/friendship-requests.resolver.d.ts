import { FriendshipRequestsService } from './friendship-requests.service';
import { FriendshipRequest } from './friendship-request.interface';
import { User } from '../users/user.interface';
import { CreateRequestDto } from './dto/create-request.dto';
import { PublisherService } from '../core/services/publisher.service';
export declare class FriendshipRequestsResolver {
    private readonly friendshipRequestsService;
    private readonly publisherService;
    constructor(friendshipRequestsService: FriendshipRequestsService, publisherService: PublisherService);
    findManyIncomingRequests(user: User): Promise<FriendshipRequest[]>;
    findManyOutgoingRequests(user: User): Promise<FriendshipRequest[]>;
    createOne(user: User, dto: CreateRequestDto): Promise<FriendshipRequest>;
    deleteOne(user: User, id: string): Promise<void>;
    acceptOne(user: User, id: string): Promise<boolean>;
}
