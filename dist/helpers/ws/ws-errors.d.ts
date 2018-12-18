import { Messages } from '../enums/messages.enum';
export declare const SERVER_ERROR = "SERVER_ERROR";
export declare const AUTH_ERROR = "AUTH_ERROR";
export declare class WsError {
    error: string;
    constructor(message: Messages);
}
