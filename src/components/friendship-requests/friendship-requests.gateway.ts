import {
  BaseWsExceptionFilter,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from '@nestjs/websockets';
import { UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FriendshipRequestsService } from './friendship-requests.service';
import { UsersService } from '../users/users.service';
import * as actions from './friendship-requests.actions';
import { SendRequestDto } from './dto/send-request.dto';
import { AcceptRequestDto } from './dto/accept-request.dto';
import { Messages } from '../../helpers/enums/messages.enum';
import { UserInterceptor } from '../../helpers/interceptors/user.interceptor';
import { RemoveRequestDto } from './dto/remove-request.dto';
import { PaginationDto } from '../core/dto/pagination.dto';
import { FriendshipRequestsType } from './friendship-requests-type.enum';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { ClientsStoreService } from '../core/services/clients-store.service';
import { getSocketIdWithNamespace } from '../../helpers/functions/get-socket-id-with-namespace';

@WebSocketGateway({ namespace: '/' })
@UsePipes(ValidationPipe)
@UseFilters(BaseWsExceptionFilter)
@UseInterceptors(UserInterceptor)
export class FriendshipRequestsGateway {

  @WebSocketServer()
  private readonly server: any;

  constructor(
    private readonly friendshipRequestsService: FriendshipRequestsService,
    private readonly usersService: UsersService,
    private readonly clientsStoreService: ClientsStoreService,
  ) {}

  @SubscribeMessage(actions.FETCH_INCOMING_FRIENDSHIP_REQUESTS)
  async onFetchIncomingFriendshipRequests(client: any, data: PaginationDto): Promise<actions.FetchIncomingFriendshipRequests> {
    console.log('Hello');
    const result = await this.fetchFriendshipRequests(client.user.id, data, FriendshipRequestsType.INCOMING);
    return new actions.FetchIncomingFriendshipRequests(result);
  }

  @SubscribeMessage(actions.FETCH_OUTGOING_FRIENDSHIP_REQUESTS)
  async onFetchOutgoingFriendshipRequests(client: any, data: PaginationDto): Promise<actions.FetchOutgoingFriendshipRequests> {
    const result =  await this.fetchFriendshipRequests(client.user.id, data, FriendshipRequestsType.OUTGOING);
    return new actions.FetchOutgoingFriendshipRequests(result);
  }

  private async fetchFriendshipRequests(userId: number, { page, limit }: PaginationDto, type: FriendshipRequestsType): Promise<FriendshipRequest[] | PaginatedResult<FriendshipRequest>> {
    let response: FriendshipRequest[] | PaginatedResult<FriendshipRequest>;

    if(page && limit) {
      response = await this.friendshipRequestsService.findManyWithPagination(userId, { page, limit }, type);
    } else {
      response = await this.friendshipRequestsService.findMany(userId, type);
    }

    return response;

  }

  @SubscribeMessage('Hello')
  async onSendFriendshipRequest(client: any, data: SendRequestDto): Promise<void | WsException> {
    console.log(client.user);
    const userId = client.user.id;
    console.log(userId);

    try {
      const isFriend = await this.usersService.isFriend(userId, data.receiverId);
      console.log('Is friend', isFriend);
    } catch (e) {
      console.log('Friend error', e);
    }

    // if(isFriend) {
    //   return new WsException(Messages.ALREADY_FRIEND);
    // }

    const friendshipRequest = await this.friendshipRequestsService.findOneBySenderId(userId);

    if(friendshipRequest) {
      return new WsException(Messages.FRIENDSHIP_REQUEST_ALREADY_EXISTS);
    }

    const newFriendshipRequest = await this.friendshipRequestsService.createOne(userId, data.receiverId, data.message);
    const socket = await this.clientsStoreService.getSocketByUserId(newFriendshipRequest.receiverId);
    if(socket) {
      this.server.to(getSocketIdWithNamespace('friendship', socket.id)).emit(actions.NEW_FRIENDSHIP_REQUEST, newFriendshipRequest);
    }
  }

  @SubscribeMessage(actions.ACCEPT_FRIENDSHIP_REQUEST)
  async onAcceptFriendshipRequest(client: any, data: AcceptRequestDto): Promise<actions.AcceptFriendshipRequest> {
    const friendshipRequest = await this.friendshipRequestsService.findOne(data.id);
    const userId = client.user.id;

    if(!friendshipRequest) {
      throw new WsException(Messages.FRIENDSHIP_REQUEST_NOT_FOUND);
    }

    if(friendshipRequest.receiverId !== userId) {
      throw new WsException(Messages.PROVIDED_USER_IS_NOT_RECEIVER);
    }

    const [friend, user] = await Promise.all([
      this.usersService.addFriend(friendshipRequest.receiverId, userId),
      this.usersService.addFriend(userId, friendshipRequest.receiverId),
      this.friendshipRequestsService.deleteOne(friendshipRequest.id)
    ]);

    if(friend && user) {
      const socket = await this.clientsStoreService.getSocketByUserId(friend.id);
      if(socket) {
        this.server.to(getSocketIdWithNamespace('friendship', socket.id)).emit(actions.NEW_ACCEPTED_FRIENDSHIP_REQUEST, user);
      }
    }

    return new actions.AcceptFriendshipRequest(friend);

  }

  @SubscribeMessage(actions.REMOVE_FRIENDSHIP_REQUEST)
  async onRejectFriendshipRequest(client: any, data: RemoveRequestDto): Promise<void> {
    await this.friendshipRequestsService.deleteOne(data.id);
  }

}