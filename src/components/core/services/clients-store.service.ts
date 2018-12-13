import { Injectable } from '@nestjs/common';
import { Socket } from '../../chats/interfaces/socket.interface';

@Injectable()
export class ClientsStoreService {

  private sockets: Map<{ socketId: string, userId: number }, Socket> = new Map();

  getSocketById(socketId: string): Socket | undefined {
    console.log(socketId);
    for(const [key, value] of this.sockets) {
      if(key.socketId === socketId) {
        return value;
      }
    }
  }

  getSocketByUserId(userId: number): Socket | undefined {
    for(const [key, value] of this.sockets) {
      if(key.userId === userId) {
        return value;
      }
    }
  }

  addSocket(socket: Socket): void {
    this.sockets.set({ socketId: socket.id, userId: socket.user.id}, socket);
  }

  removeSocket(socketId: string): void {
    for(const [key] of this.sockets) {
      if(key.socketId === socketId) {
        this.sockets.delete(key);
      }
    }
  }

}