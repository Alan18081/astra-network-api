import { Schema } from 'mongoose';

export const FileSchema = new Schema({
    url: String,
    publicId: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});