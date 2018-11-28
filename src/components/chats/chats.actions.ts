import {WsResponse} from '@nestjs/websockets';
import {Chat} from './chat.entity';

export const ADD_NEW_USER = 'ADD_NEW_USER';
export const UPDATED_CHAT = 'UPDATED_CHAT';

export class UpdatedChat implements WsResponse {
  readonly event = UPDATED_CHAT;
  constructor(public data: Chat) {}
}
