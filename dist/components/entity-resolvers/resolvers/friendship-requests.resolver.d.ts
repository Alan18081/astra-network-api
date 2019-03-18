import { FriendshipRequestsService } from '../../friendship-requests/friendship-requests.service';
import { FriendshipRequest } from '../../friendship-requests/friendship-request.interface';
import { User } from '../../users/user.interface';
import { CreateRequestDto } from '../../friendship-requests/dto/create-request.dto';
import { PublisherService } from '../../core/services/publisher.service';
import { UsersService } from '../../users/users.service';
export declare class FriendshipRequestsResolver {
    private readonly friendshipRequestsService;
    private readonly publisherService;
    private readonly usersService;
    constructor(friendshipRequestsService: FriendshipRequestsService, publisherService: PublisherService, usersService: UsersService);
    sender({ sender }: FriendshipRequest): Promise<User | null>;
    receiver({ receiver }: FriendshipRequest): Promise<User | null>;
    findManyIncomingRequests(user: User): Promise<FriendshipRequest[]>;
    findManyOutgoingRequests(user: User): Promise<FriendshipRequest[]>;
    sendOne(user: User, dto: CreateRequestDto): Promise<FriendshipRequest>;
    deleteOne(user: User, id: string): Promise<void>;
    acceptOne(user: User, id: string): Promise<boolean>;
    onSentOne(): {
        resolve: (payload: any) => any;
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
    onAcceptedOne(): {
        resolve: (payload: any) => any;
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
    onDeclinedOne(): {
        resolve: (payload: any) => any;
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
}
