import { WsException } from '@nestjs/websockets';
import { FriendshipRequestsService } from './friendship-requests.service';
import { UsersService } from '../users/users.service';
import * as actions from './friendship-requests.actions';
import { SendRequestDto } from './dto/send-request.dto';
import { AcceptRequestDto } from './dto/accept-request.dto';
import { RemoveRequestDto } from './dto/remove-request.dto';
import { PaginationDto } from '../core/dto/pagination.dto';
import { ClientsStoreService } from '../core/services/clients-store.service';
export declare class FriendshipRequestsGateway {
    private readonly friendshipRequestsService;
    private readonly usersService;
    private readonly clientsStoreService;
    private readonly server;
    constructor(friendshipRequestsService: FriendshipRequestsService, usersService: UsersService, clientsStoreService: ClientsStoreService);
    onFetchIncomingFriendshipRequests(client: any, data: PaginationDto): Promise<actions.FetchIncomingFriendshipRequests>;
    onFetchOutgoingFriendshipRequests(client: any, data: PaginationDto): Promise<actions.FetchOutgoingFriendshipRequests>;
    private fetchFriendshipRequests;
    onSendFriendshipRequest(client: any, data: SendRequestDto): Promise<void | WsException>;
    onAcceptFriendshipRequest(client: any, data: AcceptRequestDto): Promise<actions.AcceptFriendshipRequest>;
    onRejectFriendshipRequest(client: any, data: RemoveRequestDto): Promise<void>;
}
