import { WsResponse } from '@nestjs/websockets';
export declare class NotesGateway {
    private readonly server;
    emitMessage(action: WsResponse): void;
}
