import { Document } from 'mongoose';
export interface UserHash extends Document {
    _id: string;
    hash: string;
    userId: string;
}
