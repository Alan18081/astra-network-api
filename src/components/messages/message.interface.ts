import { Document } from 'mongoose';
import { User } from '../users/user.interface';

export interface Message extends Document {
  _id: string;
  text: string;
  createdAt: Date;
  user: User | string;
  chat: Chat | string;
}