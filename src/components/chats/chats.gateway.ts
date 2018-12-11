import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  WsException,
  BaseWsExceptionFilter,
} from '@nestjs/websockets';

import * as chatsActions from './chats.actions';
import * as messagesActions from '../messages/messages.actions';
import { MessagesService } from '../messages/messages.service';
import {ChatsService} from './chats.service';
import { UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import {AddNewUserDto} from './dto/sockets/add-new-user.dto';
import {Messages} from '../../helpers/enums/messages.enum';
import { AddMessageDto } from '../messages/dto/add-message.dto';
import { RemoveUserDto } from './dto/sockets/remove-user.dto';
import { UserInterceptor } from '../../helpers/interceptors/user.interceptor';
import { UpdateMessageDto } from '../messages/dto/update-message.dto';
import { RemoveMessageDto } from '../messages/dto/remove-message.dto';

@WebSocketGateway({ namespace: 'chats' })
@UsePipes(new ValidationPipe())
@UseFilters(new BaseWsExceptionFilter())
export class ChatsGateway {
  @WebSocketServer()
  private readonly server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
  ) {}

  private emitMessageToChat(chatId: number, action: WsResponse): void {
    this.server.to(chatId).emit(action.event, action.data);
  }

  @SubscribeMessage(chatsActions.ADD_NEW_USER)
  @UseInterceptors(UserInterceptor)
  async onAddUser(client: any, { chatId }: AddNewUserDto): Promise<void> {
    client.join(chatId);
    const chat = await this.chatsService.addNewUserToChat(chatId, client.user.id);
    const action = new chatsActions.AddNewUser(chat);

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
    const message = await this.messagesService.createOne(client.user.id, payload.chatId, payload.text);

    if (message) {
      const action = new messagesActions.AddMessage(message);
      this.emitMessageToChat(payload.chatId, action);
    }
  }

  @SubscribeMessage(messagesActions.UPDATE_MESSAGE)
  @UseInterceptors(UserInterceptor)
  async onUpdateMessage(client: any, payload: UpdateMessageDto): Promise<void> {
    const message = await this.messagesService.findOne(payload.messageId, {});
    if (!message) {
      throw new WsException(Messages.MESSAGE_NOT_FOUND);
    }

    if (message.userId !== client.user.id) {
      throw new WsException(Messages.INVALID_RIGHTS_TO_UPDATE_MESSAGE);
    }

    const updatedMessage = await this.messagesService.updateOne(payload);

    const action = new messagesActions.UpdateMessage(updatedMessage);

    this.emitMessageToChat(payload.chatId, action);
  }

  @SubscribeMessage(messagesActions.REMOVE_MESSAGE)
  @UseInterceptors(UserInterceptor)
  async onRemoveMessage(client: any, payload: RemoveMessageDto): Promise<void> {
    const message = await this.messagesService.findOne(payload.messageId, {});
    if (!message) {
      throw new WsException(Messages.MESSAGE_NOT_FOUND);
    }

    if (message.userId !== client.user.id) {
      throw new WsException(Messages.INVALID_RIGHTS_TO_UPDATE_MESSAGE);
    }

    await this.messagesService.deleteOne(payload.messageId);

    const action = new messagesActions.RemoveMessage(payload.messageId);

    this.emitMessageToChat(payload.chatId, action);
  }
}