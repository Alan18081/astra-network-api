"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_ERROR = 'SERVER_ERROR';
exports.AUTH_ERROR = 'AUTH_ERROR';
class WsError {
    constructor(message) {
        this.error = message;
    }
}
exports.WsError = WsError;
//# sourceMappingURL=ws-errors.js.map