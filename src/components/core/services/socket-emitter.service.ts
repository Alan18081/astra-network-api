import { Injectable } from '@nestjs/common';
import { WebSocketServer, WsResponse } from '@nestjs/websockets';

@Injectable()
export class SocketEmitterService {

  @WebSocketServer()
  private readonly server;

  emitEvent(action: WsResponse, groupId?: number): void {
    if (groupId) {
      this.server.to(groupId).emit(action.event, action.data);
    } else {
      this.server.emit(action.event, action.data);
    }
  }

}