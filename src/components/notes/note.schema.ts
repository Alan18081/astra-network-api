import { Schema } from 'mongoose';

export const NoteSchema = new Schema({
  title: String,
  description: { type: String, default: '' },
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  // comments: [CommentSchema],
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  groupId: { type: Schema.Types.ObjectId, ref: 'Group', default: null },
});
