import { Document } from 'mongoose';
import { User } from '../users/user.interface';

export interface FriendshipRequest extends Document {
  _id: string;
  receiver: string;
  sender: string;
  message?: string;
}