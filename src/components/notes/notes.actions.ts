import {WsResponse} from '@nestjs/websockets';
import {Note} from './note.entity';

const namespace = 'Notes';

export const ADDED_NOTE = `[${namespace}] Added note`;
export const UPDATED_NOTE = `[${namespace}] Updated note`;
export const REMOVED_NOTE = `[${namespace}] Removed note`;

export class AddedNote implements WsResponse {
  readonly event = ADDED_NOTE;
  constructor(public data: Note) {}
}

export class UpdatedNote implements WsResponse {
  readonly event = UPDATED_NOTE;
  constructor(public data: Note) {}
}

export class RemovedNote implements WsResponse {
  readonly event = REMOVED_NOTE;
  constructor(public data: number) {}
}