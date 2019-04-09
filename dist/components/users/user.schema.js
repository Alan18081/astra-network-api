"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: mongoose_1.Schema.Types.ObjectId, ref: 'File' },
    countryCode: String,
    phone: String,
    authyId: String,
    age: { type: Number, default: 0 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    chats: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Chat' }],
    online: { type: Boolean, default: false },
    notes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Note' }],
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
exports.UserSchema = UserSchema;
UserSchema.index({ email: 1 });
UserSchema.index({ firstName: 'text', lastName: 'text' });
//# sourceMappingURL=user.schema.js.map