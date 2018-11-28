import {SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection} from '@nestjs/websockets';

import {AddMessageDto} from './dto/add-message.dto';
import * as actions from '../messages/messages.actions';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UpdateMessageDto} from './dto/update-message.dto';
import {RemoveMessageDto} from './dto/remove-message.dto';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({ namespace: 'messages' })
export class ChatsGateway implements OnGatewayConnection {
  @WebSocketServer() server;

  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  handleConnection(client: any) {
    console.log('New');
  }

  @SubscribeMessage('ADD_USER')
  onAttendUser(client: any, { chatId }): void {
    client.join(chatId);
  }

  @SubscribeMessage(actions.ADD_MESSAGE)
  async onAddMessage(client, payload: AddMessageDto): Promise<void> {
    this.server.to(payload.chatId).emit(actions.ADD_MESSAGE, { title: 'Response' });
    // return
   // const message = await this.messagesService.addMessage(payload);
   // const action = new actions.AddMessage(message);
   // this.server.to(payload.chatId).emit(action.event, action.data);
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
  // onRemoveMessage(client, payload: RemoveMessageDto): Observable<actions.RemoveMessage> {
  //   return from(this.messagesService.removeMessage(payload.id))
  //     .pipe(
  //       map((message: Message) => new actions.RemoveMessage(message))
  //     );
  // }
}