"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ChatSchema = new mongoose_1.Schema({
    name: String,
    admin: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' }],
    lastMessage: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' },
});
//# sourceMappingURL=chat.schema.js.map