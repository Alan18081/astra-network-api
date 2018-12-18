import { User } from '../users/user.entity';
import { Chat } from '../chats/chat.entity';
export declare class Message {
    id: number;
    text: string;
    createdAt: string;
    userId: number;
    user: User;
    chat: Chat;
}
