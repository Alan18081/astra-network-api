"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    text: String,
    createdAt: Date,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    chat: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Chat' },
});
//# sourceMappingURL=message.schema.js.map