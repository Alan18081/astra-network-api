import {WsResponse} from '@nestjs/websockets';
import {Message} from './message.entity';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export class AddMessage implements WsResponse {
  readonly event = ADD_MESSAGE;
  constructor(public data: Message) {}
}

export class UpdateMessage implements WsResponse {
  readonly event = UPDATE_MESSAGE;
  constructor(public data: Message | undefined) {}
}

export class RemoveMessage implements WsResponse {
  readonly event = REMOVE_MESSAGE;
  constructor(public data: number) {}
}