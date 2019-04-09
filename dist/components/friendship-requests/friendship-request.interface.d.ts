import { Document } from 'mongoose';
export interface FriendshipRequest extends Document {
    _id: string;
    receiver: string;
    sender: string;
    message?: string;
}
