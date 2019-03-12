import { Schema } from 'mongoose';
import { Chat } from '../chats/chat.entity';
import { Note } from '../notes/note.entity';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  age: { type: Number, default: '' },
  email: String,
  password: { type: String, default: '' },
  googleId: { type: String, default: '' },
  emailVerified: Boolean,
  phoneVerified: Boolean,
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  online: Boolean,
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

UserSchema.index({ email: 1 });

export { UserSchema };