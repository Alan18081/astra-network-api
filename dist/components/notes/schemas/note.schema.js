"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const comment_schema_1 = require("./comment.schema");
exports.NoteSchema = new mongoose_1.Schema({
    title: String,
    description: { type: String, default: '' },
    files: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'File' }],
    comments: [comment_schema_1.CommentSchema],
    likes: { type: Number, default: 0, min: 0 },
    dislikes: { type: Number, default: 0, min: 0 },
    likedUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    dislikedUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    group: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Group', default: null },
});
//# sourceMappingURL=note.schema.js.map