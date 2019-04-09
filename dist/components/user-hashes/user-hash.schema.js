"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserHashSchema = new mongoose_1.Schema({
    hash: String,
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
});
//# sourceMappingURL=user-hash.schema.js.map