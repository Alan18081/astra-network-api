import { User } from '../users/user.entity';
import { BaseEntity } from '../core/base.entity';
import { Note } from '../notes/note.entity';
export declare class Comment extends BaseEntity {
    text: string;
    userId?: number;
    noteId?: number;
    user: User;
    note: Note;
}
