import { WsResponse } from '@nestjs/websockets';
import { Chat } from './chat.entity';
export declare const ADD_NEW_USER: string;
export declare const REMOVE_USER: string;
export declare const UPDATED_CHAT: string;
export declare class AddNewUser implements WsResponse {
    data: Chat;
    readonly event: string;
    constructor(data: Chat);
}
export declare class RemoveUser implements WsResponse {
    data: Chat;
    readonly event: string;
    constructor(data: Chat);
}
export declare class UpdatedChat implements WsResponse {
    data: Chat;
    readonly event: string;
    constructor(data: Chat);
}
