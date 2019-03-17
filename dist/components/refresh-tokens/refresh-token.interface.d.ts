import { Document } from 'mongoose';
export interface RefreshToken extends Document {
    _id: string;
    token: string;
    user: string;
}
