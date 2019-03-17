"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RefreshTokenSchema = new mongoose_1.Schema({
    token: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
});
exports.RefreshTokenSchema = RefreshTokenSchema;
RefreshTokenSchema.index({ token: 1 });
//# sourceMappingURL=refresh-token.schema.js.map