import {WsResponse} from '@nestjs/websockets';
import {Chat} from './chat.entity';

export const ADD_NEW_USER = 'ADD_NEW_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATED_CHAT = 'UPDATED_CHAT';

export class AddNewUser implements WsResponse {
  readonly event = ADD_NEW_USER;
  constructor(public data: Chat) {}
}

export class RemoveUser implements WsResponse {
  readonly event = REMOVE_USER;
  constructor(public data: Chat) {}
}

export class UpdatedChat implements WsResponse {
  readonly event = UPDATED_CHAT;
  constructor(public data: Chat) {}
}
