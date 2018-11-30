import { Injectable } from '@nestjs/common';
import { Socket } from './interfaces/socket.interface';

@Injectable()
export class ClientsStoreService {

  private sockets: Map<string, Socket> = new Map();

  getSocket(socketId: string): Socket | undefined {
    return this.sockets.get(socketId);
  }

  addSocket(socket: Socket): void {
    this.sockets.set(socket.id, socket);
  }

  removeSocket(socketId: string): void {
    this.sockets.delete(socketId);
  }

}