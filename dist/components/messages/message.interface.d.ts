import { Document } from 'mongoose';
export interface Message extends Document {
    _id: string;
    text: string;
    createdAt: Date;
    author: string;
    chat: string;
}
