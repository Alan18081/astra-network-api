import { Messages } from '../enums/messages.enum';

export const SERVER_ERROR = '[Websocket] Server Error';
export const AUTH_ERROR = '[Websocket] Auth Error';

export class WsError {
  error: string;

  constructor(message: Messages) {
    this.error = message;
  }

}
