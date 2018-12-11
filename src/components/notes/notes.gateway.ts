import {
  WebSocketGateway, WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
@WebSocketGateway({ namespace: 'notes' })
export class NotesGateway {

  @WebSocketServer()
  private readonly server;

  emitMessage(action: WsResponse): void {
    this.server.emit(action.event, action.data);
  }

}