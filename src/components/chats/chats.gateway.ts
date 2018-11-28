import {
  SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, WsResponse, WsException,
} from '@nestjs/websockets';

import {AddMessageDto} from './dto/http/add-message.dto';
import * as chatsActions from './chats.actions';
import * as messagesActions from '../messages/messages.actions';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UpdateMessageDto} from './dto/http/update-message.dto';
import {RemoveMessageDto} from './dto/http/remove-message.dto';
import { MessagesService } from '../messages/messages.service';
import {ChatsService} from './chats.service';
import {UnauthorizedException, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AddNewUserDto} from './dto/sockets/add-new-user.dto';
import {AuthSocketGuard} from './auth-socket.guard';
import {Messages} from '../../helpers/enums/messages.enum';
import {AuthService} from '../auth/auth.service';
import {JwtResponse} from '../auth/interfaces/jwt-response';

@WebSocketGateway({ namespace: 'messages' })
@UsePipes(new ValidationPipe())
export class ChatsGateway implements OnGatewayConnection {
  @WebSocketServer() server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
    private readonly authService: AuthService,
  ) {}

  handleConnection(client: any) {
    const token = client.handshake.query;

    if (!token) {
      throw new WsException(Messages.AUTH_TOKEN_NOT_FOUND);
    }

    const data: JwtResponse = this.authService.decodeToken(token);
    console.log(data);
  }

  @SubscribeMessage(chatsActions.ADD_NEW_USER)
  onAttendUser(client: any, { chatId, userId }: AddNewUserDto): void {
    client.join(chatId);
    console.log('Attending new user');
    this.chatsService.addNewUser(chatId, userId);
  }

  @SubscribeMessage(messagesActions.ADD_MESSAGE)
  async onAddMessage(client: any, payload: AddMessageDto): Promise<void> {
    const message = await this.messagesService.addMessage(payload);
    if (message) {
      const action = new messagesActions.AddMessage(message);
      this.server.to(payload.chatId).emit(action.event, action.data);
    }
  }

  emitMessage(group: string | number, action: WsResponse): void {
    this.server.to(group).emit(action.event, action.data);
  }

  // @SubscribeMessage(actions.UPDATE_MESSAGE)
  // async onUpdateMessage(client, payload: UpdateMessageDto): Observable<actions.UpdateMessage> {
  //   return from(this.messagesService.updateMessage(payload))
  //     .pipe(
  //       map((message: Message | undefined) => new actions.UpdateMessage(message))
  //     );
  // }
  //
  // @SubscribeMessage(actions.REMOVE_MESSAGE)
  // onRemoveMessage(client: any, payload: RemoveMessageDto): Observable<actions.RemoveMessage> {
  //   return from(this.messagesService.removeMessage(payload.id))
  //     .pipe(
  //       map((message: Message) => new actions.RemoveMessage(message))
  //     );
  // }
}