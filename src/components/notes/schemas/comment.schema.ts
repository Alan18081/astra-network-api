import { Schema } from 'mongoose';
import {User} from '../../users/user.interface';
import {AnswerSchema} from './answer.schema';

export const CommentSchema = new Schema({
    text: String,
    createdAt: Date,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [AnswerSchema]
});

