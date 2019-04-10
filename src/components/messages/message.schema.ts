import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
  text: String,
  createdAt: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
});