import { Document } from 'mongoose';

export interface File extends Document {
    _id: string;
    url: string;
    publicId: string;
    userId: number;
}