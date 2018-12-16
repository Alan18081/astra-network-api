import {WsResponse} from '@nestjs/websockets';
import {Chat} from './chat.entity';

const namespace = 'Chats';

export const ADD_NEW_USER = `[${namespace}] Add new user to chat`;
export const REMOVE_USER = `[${namespace}] Remove user from chat`;
export const UPDATED_CHAT = `[${namespace}] Updated chat`;

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
