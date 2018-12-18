"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const namespace = 'Chats';
exports.ADD_NEW_USER = `[${namespace}] Add new user to chat`;
exports.REMOVE_USER = `[${namespace}] Remove user from chat`;
exports.UPDATED_CHAT = `[${namespace}] Updated chat`;
class AddNewUser {
    constructor(data) {
        this.data = data;
        this.event = exports.ADD_NEW_USER;
    }
}
exports.AddNewUser = AddNewUser;
class RemoveUser {
    constructor(data) {
        this.data = data;
        this.event = exports.REMOVE_USER;
    }
}
exports.RemoveUser = RemoveUser;
class UpdatedChat {
    constructor(data) {
        this.data = data;
        this.event = exports.UPDATED_CHAT;
    }
}
exports.UpdatedChat = UpdatedChat;
//# sourceMappingURL=chats.actions.js.map