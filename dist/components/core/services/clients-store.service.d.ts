import { Socket } from '../../chats/interfaces/socket.interface';
export declare class ClientsStoreService {
    private sockets;
    private userIdsToSocketIds;
    private socketIdsToUserIds;
    getSocketById(socketId: string): Socket | undefined;
    getSocketByUserId(userId: number): Socket | undefined;
    addSocket(socket: Socket): void;
    removeSocket(socketId: string): void;
}
