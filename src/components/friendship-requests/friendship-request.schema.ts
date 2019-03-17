import { Schema } from 'mongoose';

export const FriendshipRequestSchema = new Schema({
  receiver: { type: Schema.Types.ObjectId, ref: 'User' },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, default: ''},
});