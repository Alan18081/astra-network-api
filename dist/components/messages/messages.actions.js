"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_MESSAGE = 'ADD_MESSAGE';
exports.UPDATE_MESSAGE = 'UPDATE_MESSAGE';
exports.REMOVE_MESSAGE = 'REMOVE_MESSAGE';
class AddMessage {
    constructor(data) {
        this.data = data;
        this.event = exports.ADD_MESSAGE;
    }
}
exports.AddMessage = AddMessage;
class UpdateMessage {
    constructor(data) {
        this.data = data;
        this.event = exports.UPDATE_MESSAGE;
    }
}
exports.UpdateMessage = UpdateMessage;
class RemoveMessage {
    constructor(data) {
        this.data = data;
        this.event = exports.REMOVE_MESSAGE;
    }
}
exports.RemoveMessage = RemoveMessage;
//# sourceMappingURL=messages.actions.js.map