"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const answer_schema_1 = require("./answer.schema");
exports.CommentSchema = new mongoose_1.Schema({
    text: String,
    createdAt: Date,
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    answers: [answer_schema_1.AnswerSchema]
});
//# sourceMappingURL=comment.schema.js.map