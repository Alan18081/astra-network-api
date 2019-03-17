import { Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  age: { type: Number, default: 0 },
  email: String,
  password: String,
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  online: Boolean,
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

UserSchema.index({ email: 1 });

export { UserSchema };