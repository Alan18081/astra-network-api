import { BaseEntity } from '../core/base.entity';
import { Chat } from '../chats/chat.entity';
import { Note } from '../notes/note.entity';
export declare class User extends BaseEntity {
    firstName: string;
    lastName: string;
    age?: number;
    email: string;
    password?: string;
    googleId?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    chats?: Chat[];
    online: boolean;
    notes?: Note[];
    friends: User[];
}
