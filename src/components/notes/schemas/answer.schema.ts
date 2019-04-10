import { Schema } from 'mongoose';

export const AnswerSchema = new Schema({
    text: String,
    createdAt: Date,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});