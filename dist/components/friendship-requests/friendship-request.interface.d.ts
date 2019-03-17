import { Document } from 'mongoose';
import { User } from '../users/user.interface';
export interface FriendshipRequest extends Document {
    _id: string;
    receiver: User | string;
    sender: User | string;
    message?: string;
}
