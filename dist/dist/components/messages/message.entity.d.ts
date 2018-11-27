import { User } from '../users/user.entity';
export declare class Message {
    id: number;
    text: string;
    createdAt: string;
    author: User;
}
