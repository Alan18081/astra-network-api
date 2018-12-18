"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
const chatsActions = require("./chats.actions");
const messagesActions = require("../messages/messages.actions");
const messages_service_1 = require("../messages/messages.service");
const chats_service_1 = require("./chats.service");
const common_1 = require("@nestjs/common");
const add_new_user_dto_1 = require("./dto/sockets/add-new-user.dto");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const add_message_dto_1 = require("../messages/dto/add-message.dto");
const remove_user_dto_1 = require("./dto/sockets/remove-user.dto");
const user_interceptor_1 = require("../../helpers/interceptors/user.interceptor");
const update_message_dto_1 = require("../messages/dto/update-message.dto");
const remove_message_dto_1 = require("../messages/dto/remove-message.dto");
let ChatsGateway = class ChatsGateway {
    constructor(chatsService, messagesService) {
        this.chatsService = chatsService;
        this.messagesService = messagesService;
    }
    emitMessageToChat(chatId, action) {
        this.server.to(chatId).emit(action.event, action.data);
    }
    onAddUser(client, { chatId }) {
        return __awaiter(this, void 0, void 0, function* () {
            client.join(chatId);
            const chat = yield this.chatsService.addNewUserToChat(chatId, client.user.id);
            const action = new chatsActions.AddNewUser(chat);
            this.emitMessageToChat(chatId, action);
        });
    }
    onRemoveUser(client, { chatId, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            client.leave(chatId);
            const chat = yield this.chatsService.removeUserFromChat(chatId, userId);
            const action = new chatsActions.UpdatedChat(chat);
            this.emitMessageToChat(chatId, action);
        });
    }
    onAddMessage(client, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messagesService.createOne(client.user.id, payload.chatId, payload.text);
            if (message) {
                const action = new messagesActions.AddMessage(message);
                this.emitMessageToChat(payload.chatId, action);
            }
        });
    }
    onUpdateMessage(client, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messagesService.findOne(payload.messageId, {});
            if (!message) {
                throw new websockets_1.WsException(messages_enum_1.Messages.MESSAGE_NOT_FOUND);
            }
            if (message.userId !== client.user.id) {
                throw new websockets_1.WsException(messages_enum_1.Messages.INVALID_RIGHTS_TO_UPDATE_MESSAGE);
            }
            const updatedMessage = yield this.messagesService.updateOne(payload);
            const action = new messagesActions.UpdateMessage(updatedMessage);
            this.emitMessageToChat(payload.chatId, action);
        });
    }
    onRemoveMessage(client, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messagesService.findOne(payload.messageId, {});
            if (!message) {
                throw new websockets_1.WsException(messages_enum_1.Messages.MESSAGE_NOT_FOUND);
            }
            if (message.userId !== client.user.id) {
                throw new websockets_1.WsException(messages_enum_1.Messages.INVALID_RIGHTS_TO_UPDATE_MESSAGE);
            }
            yield this.messagesService.deleteOne(payload.messageId);
            const action = new messagesActions.RemoveMessage(payload.messageId);
            this.emitMessageToChat(payload.chatId, action);
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ChatsGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage(chatsActions.ADD_NEW_USER),
    common_1.UseInterceptors(user_interceptor_1.UserInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_new_user_dto_1.AddNewUserDto]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "onAddUser", null);
__decorate([
    websockets_1.SubscribeMessage(chatsActions.REMOVE_USER),
    common_1.UseInterceptors(user_interceptor_1.UserInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_user_dto_1.RemoveUserDto]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "onRemoveUser", null);
__decorate([
    websockets_1.SubscribeMessage(messagesActions.ADD_MESSAGE),
    common_1.UseInterceptors(user_interceptor_1.UserInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_message_dto_1.AddMessageDto]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "onAddMessage", null);
__decorate([
    websockets_1.SubscribeMessage(messagesActions.UPDATE_MESSAGE),
    common_1.UseInterceptors(user_interceptor_1.UserInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "onUpdateMessage", null);
__decorate([
    websockets_1.SubscribeMessage(messagesActions.REMOVE_MESSAGE),
    common_1.UseInterceptors(user_interceptor_1.UserInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_message_dto_1.RemoveMessageDto]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "onRemoveMessage", null);
ChatsGateway = __decorate([
    websockets_1.WebSocketGateway(),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.UseFilters(websockets_1.BaseWsExceptionFilter),
    common_1.UseInterceptors(user_interceptor_1.UserInterceptor),
    __metadata("design:paramtypes", [chats_service_1.ChatsService,
        messages_service_1.MessagesService])
], ChatsGateway);
exports.ChatsGateway = ChatsGateway;
//# sourceMappingURL=chats.gateway.js.map