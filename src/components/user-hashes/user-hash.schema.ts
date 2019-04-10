import { Schema } from 'mongoose';

export const UserHashSchema = new Schema({
  hash: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});