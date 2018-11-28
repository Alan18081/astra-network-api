import { User } from '../users/user.entity';
import { Chat } from '../chats/chat.entity';
export declare class Message {
    id: number;
    text: string;
    createdAt: string;
    author: User;
    chat: Chat;
}
