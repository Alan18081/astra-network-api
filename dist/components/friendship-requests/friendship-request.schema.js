"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.FriendshipRequestSchema = new mongoose_1.Schema({
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, default: '' },
});
//# sourceMappingURL=friendship-request.schema.js.map