import { Schema } from 'mongoose';
import {User} from '../users/user.interface';

export const CommentSchema = new Schema({
    text: String,
    createdAt: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});