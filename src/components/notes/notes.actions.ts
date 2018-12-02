import {WsResponse} from '@nestjs/websockets';
import {Note} from './note.entity';
export const ADDED_NOTE = '[Notes] Added Note';
export const UPDATED_NOTE = '[Notes] Updated Note';
export const REMOVED_NOTE = '[Notes] Removed Note';

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