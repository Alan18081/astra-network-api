import { Schema } from 'mongoose';
import { User } from '../users/user.interface';

export const FriendshipRequestSchema = new Schema({
  receiver: { type: Schema.Types.ObjectId, ref: 'Receiver' },
  sender: { type: Schema.Types.ObjectId, ref: 'Sender' },
  message: { type: String, default: ''},
});