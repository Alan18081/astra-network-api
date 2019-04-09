import { Document } from 'mongoose';

export interface Comment extends Document {
    _id: string;
    text: string;
    createdAt: Date;
    author: string;
    answers: Comment[]
}