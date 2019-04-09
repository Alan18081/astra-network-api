"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.FileSchema = new mongoose_1.Schema({
    url: String,
    publicId: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
});
//# sourceMappingURL=file.schema.js.map