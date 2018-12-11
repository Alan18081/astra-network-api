import { BaseWsExceptionFilter, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';
import { UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FriendshipRequestsService } from './friendship-requests.service';
import { UsersService } from '../users/users.service';
import * as actions from './friendship-requests.actions';
import { SendRequestDto } from './dto/send-request.dto';
import { AcceptRequestDto } from './dto/accept-request.dto';
import { Messages } from '../../helpers/enums/messages.enum';
import { UserInterceptor } from '../../helpers/interceptors/user.interceptor';
import { RemoveRequestDto } from './dto/remove-request.dto';

@WebSocketGateway({ namespace: '/friendship' })
@UsePipes(new ValidationPipe())
@UseFilters(new BaseWsExceptionFilter())
@UseInterceptors(UserInterceptor)
export class FriendshipRequestsGateway {

  constructor(
    private readonly friendshipRequestsService: FriendshipRequestsService,
    private readonly usersService: UsersService,
  ) {}

  @SubscribeMessage(actions.FETCH_INCOMING_FRIENDSHIP_REQUESTS)
  async onFetchIncomingFriendshipRequests(client: any): Promise<actions.FetchIncomingFriendshipRequests> {
    const friendshipRequests = await this.friendshipRequestsService.findIncomingRequests(client.user.id);
    return new actions.FetchIncomingFriendshipRequests(friendshipRequests);
  }

  @SubscribeMessage(actions.FETCH_OUTGOING_FRIENDSHIP_REQUESTS)
  async onFetchOutgoingFriendshipRequests(client: any): Promise<actions.FetchOutgoingFriendshipRequests> {
    const friendshipRequests = await this.friendshipRequestsService.findOutgoingRequests(client.user.id);
    return new actions.FetchOutgoingFriendshipRequests(friendshipRequests);
  }

  @SubscribeMessage(actions.SEND_FRIENDSHIP_REQUEST)
  async onSendFriendshipRequest(client: any, data: SendRequestDto): Promise<void> {
    await this.friendshipRequestsService.createOne(client.user.id, data.receiverId, data.message);
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

    const [friend] = await Promise.all([
      this.usersService.addFriend(friendshipRequest.receiverId, userId),
      this.usersService.addFriend(userId, friendshipRequest.receiverId),
      this.friendshipRequestsService.deleteOne(friendshipRequest.id)
    ]);

    return await new actions.AcceptFriendshipRequest(friend);
  }

  @SubscribeMessage(actions.REMOVE_FRIENDSHIP_REQUEST)
  async onRejectFriendshipRequest(client: any, data: RemoveRequestDto): Promise<void> {
    await this.friendshipRequestsService.deleteOne(data.id);
  }

}