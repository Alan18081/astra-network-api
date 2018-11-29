import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse,
  WsException,
  BaseWsExceptionFilter, OnGatewayDisconnect,
} from '@nestjs/websockets';

import * as chatsActions from './chats.actions';
import * as messagesActions from '../messages/messages.actions';
import { MessagesService } from '../messages/messages.service';
import {ChatsService} from './chats.service';
import { UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import {AddNewUserDto} from './dto/sockets/add-new-user.dto';
import {Messages} from '../../helpers/enums/messages.enum';
import {AuthService} from '../auth/auth.service';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { AddMessageDto } from '../messages/dto/add-message.dto';
import { RemoveUserDto } from './dto/sockets/remove-user.dto';
import { UserInterceptor } from './user.interceptor';
import { ClientsStoreService } from './clients-store.service';
import { UpdateMessageDto } from '../messages/dto/update-message.dto';
import { RemoveMessageDto } from '../messages/dto/remove-message.dto';

@WebSocketGateway({ namespace: 'messages' })
@UsePipes(new ValidationPipe())
@UseFilters(new BaseWsExceptionFilter())
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
    private readonly authService: AuthService,
    private readonly clientsStoreService: ClientsStoreService,
  ) {}

  private emitMessageToChat(chatId: number, action: WsResponse): void {
    this.server.to(chatId).emit(action.event, action.data);
  }

  async handleConnection(client: any) {
    const { token } = client.handshake.query;

    if (!token) {
      throw new WsException(Messages.AUTH_TOKEN_NOT_FOUND);
    }

    const data = this.authService.decodeToken(token) as JwtPayload;
    const user = await this.authService.validateUser(data);

    if (!user) {
      throw new WsException(Messages.USER_NOT_FOUND);
    }

    this.clientsStoreService.addSocket({
      id: client.id,
      socket: client,
      user,
    });
  }

  async handleDisconnect(client: any) {
    this.clientsStoreService.removeSocket(client.id);
  }

  @SubscribeMessage(chatsActions.ADD_NEW_USER)
  @UseInterceptors(UserInterceptor)
  async onAddUser(client: any, { chatId }: AddNewUserDto): Promise<void> {
    const chat = await this.chatsService.addNewUserToChat(chatId, client.user.id);
    const action = new chatsActions.UpdatedChat(chat);

    this.emitMessageToChat(chatId, action);
  }

  @SubscribeMessage(chatsActions.REMOVE_USER)
  @UseInterceptors(UserInterceptor)
  async onRemoveUser(client: any, { chatId, userId }: RemoveUserDto): Promise<void> {
    client.leave(chatId);
    const chat = await this.chatsService.removeUserFromChat(chatId, userId);
    const action = new chatsActions.UpdatedChat(chat);

    this.emitMessageToChat(chatId, action);
  }

  @SubscribeMessage(messagesActions.ADD_MESSAGE)
  @UseInterceptors(UserInterceptor)
  async onAddMessage(client: any, payload: AddMessageDto): Promise<void> {
    const message = await this.messagesService.addMessage(client.user.id, payload.chatId, payload.text);

    if (message) {
      const action = new messagesActions.AddMessage(message);
      this.emitMessageToChat(payload.chatId, action);
    }
  }

  @SubscribeMessage(messagesActions.UPDATE_MESSAGE)
  @UseInterceptors(UserInterceptor)
  async onUpdateMessage(client: any, payload: UpdateMessageDto): Promise<void> {
    const message = await this.messagesService.findOne(id, {});
    if (!message) {
      throw new WsException(Messages.MESSAGE_NOT_FOUND);
    }
  }

  @SubscribeMessage(messagesActions.REMOVE_MESSAGE)
  @UseInterceptors(UserInterceptor)
  onRemoveMessage(client: any, payload: RemoveMessageDto): Promise<void> {

  }
}