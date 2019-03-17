import { Document } from 'mongoose';
export interface Chat extends Document {
    _id: string;
    name: string;
    createdAt: Date;
    admin: string;
    users: string[];
}
