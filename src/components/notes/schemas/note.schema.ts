import { Schema } from 'mongoose';
import {CommentSchema} from './comment.schema';

const NoteSchema = new Schema({
  title: String,
  description: { type: String, default: '' },
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  comments: [CommentSchema],
  likes: { type: Number, default: 0, min: 0 },
  dislikes: { type: Number, default: 0, min: 0 },
  likedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dislikedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  group: { type: Schema.Types.ObjectId, ref: 'Group', default: null },
});

NoteSchema.index({ title: 'text', description: 'text' });

export { NoteSchema };
