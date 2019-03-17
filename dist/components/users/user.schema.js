"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    age: { type: Number, default: 0 },
    email: String,
    password: String,
    chats: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Chat' }],
    online: Boolean,
    notes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Note' }],
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
exports.UserSchema = UserSchema;
UserSchema.index({ email: 1 });
//# sourceMappingURL=user.schema.js.map