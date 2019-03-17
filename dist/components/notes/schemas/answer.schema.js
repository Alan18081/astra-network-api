"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.AnswerSchema = new mongoose_1.Schema({
    text: String,
    createdAt: Date,
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
});
//# sourceMappingURL=answer.schema.js.map