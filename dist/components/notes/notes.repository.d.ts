import { BaseRepository } from '../core/base.repository';
import { Model } from 'mongoose';
import { Note } from './interfaces/note.interface';
import { Comment } from './interfaces/comment.interface';
export declare class NotesRepository extends BaseRepository<Note> {
    constructor(noteModel: Model<Note>);
    findByIds(ids: string[]): Promise<Note[]>;
    findOneByIdAndCommentId(noteId: string, commentId: string): Promise<Note | null>;
    addComment(noteId: string, comment: Partial<Comment>): Promise<Note | null>;
    removeComment(noteId: string, commentId: string): Promise<Note | null>;
    addAnswerToComment(noteId: string, commentId: string, answer: Partial<Comment>): Promise<Note | null>;
    addLikeToNote(noteId: string, userId: string): Promise<Note | null>;
    removeLikeFromNote(noteId: string, userId: string): Promise<Note | null>;
    addDislikeToNote(noteId: string, userId: string): Promise<Note | null>;
    removeDislikeFromNote(noteId: string, userId: string): Promise<Note | null>;
}
