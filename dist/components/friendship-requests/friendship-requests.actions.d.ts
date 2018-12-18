import { WsResponse } from '@nestjs/websockets';
import { User } from '../users/user.entity';
import { FriendshipRequest } from './friendship-request.entity';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
export declare const SEND_FRIENDSHIP_REQUEST: string;
export declare const NEW_FRIENDSHIP_REQUEST: string;
export declare const NEW_ACCEPTED_FRIENDSHIP_REQUEST: string;
export declare const ACCEPT_FRIENDSHIP_REQUEST: string;
export declare const REMOVE_FRIENDSHIP_REQUEST: string;
export declare const FETCH_INCOMING_FRIENDSHIP_REQUESTS: string;
export declare const FETCH_OUTGOING_FRIENDSHIP_REQUESTS: string;
export declare class NewFriendshipRequest implements WsResponse {
    data: FriendshipRequest;
    readonly event: string;
    constructor(data: FriendshipRequest);
}
export declare class AcceptFriendshipRequest implements WsResponse {
    readonly event: string;
    data: {
        friend: User | undefined;
    };
    constructor(friend: User | undefined);
}
export declare class FetchIncomingFriendshipRequests implements WsResponse {
    data: FriendshipRequest[] | PaginatedResult<FriendshipRequest>;
    readonly event: string;
    constructor(data: FriendshipRequest[] | PaginatedResult<FriendshipRequest>);
}
export declare class FetchOutgoingFriendshipRequests implements WsResponse {
    data: FriendshipRequest[] | PaginatedResult<FriendshipRequest>;
    readonly event: string;
    constructor(data: FriendshipRequest[] | PaginatedResult<FriendshipRequest>);
}
