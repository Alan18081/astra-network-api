import { Document } from 'mongoose';
import { User } from '../users/user.interface';
import { Chat } from '../chats/chat.interface';

export interface Message extends Document {
  _id: string;
  text: string;
  createdAt: Date;
  author: string;
  chat: string;
}