import { WsResponse } from '@nestjs/websockets';
import { Message } from './message.entity';
export declare const ADD_MESSAGE = "ADD_MESSAGE";
export declare const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export declare const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export declare class AddMessage implements WsResponse {
    data: Message;
    readonly event: string;
    constructor(data: Message);
}
export declare class UpdateMessage implements WsResponse {
    data: Message | undefined;
    readonly event: string;
    constructor(data: Message | undefined);
}
export declare class RemoveMessage implements WsResponse {
    data: number;
    readonly event: string;
    constructor(data: number);
}
