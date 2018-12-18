import { WsResponse } from '@nestjs/websockets';
import { Note } from './note.entity';
export declare const ADDED_NOTE: string;
export declare const UPDATED_NOTE: string;
export declare const REMOVED_NOTE: string;
export declare class AddedNote implements WsResponse {
    data: Note;
    readonly event: string;
    constructor(data: Note);
}
export declare class UpdatedNote implements WsResponse {
    data: Note;
    readonly event: string;
    constructor(data: Note);
}
export declare class RemovedNote implements WsResponse {
    data: number;
    readonly event: string;
    constructor(data: number);
}
