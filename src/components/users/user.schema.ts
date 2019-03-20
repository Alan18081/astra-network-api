import { Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  countryCode: String,
  phone: String,
  authyId: String,
  age: { type: Number, default: 0 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  online: { type: Boolean, default: false },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

UserSchema.index({ email: 1, firstName: 'text', lastName: 'text' });

export { UserSchema };