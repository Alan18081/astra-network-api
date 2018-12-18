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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const clients_store_service_1 = require("../../components/core/services/clients-store.service");
const websockets_1 = require("@nestjs/websockets");
const messages_enum_1 = require("../enums/messages.enum");
let UserInterceptor = class UserInterceptor {
    constructor(clientsStoreService) {
        this.clientsStoreService = clientsStoreService;
    }
    intercept(context, call$) {
        console.log('Start interceptor');
        const socketContext = context.switchToWs();
        const client = socketContext.getClient();
        const socket = this.clientsStoreService.getSocketById(client.client.id);
        console.log('Inside interceptor', socket);
        if (!socket) {
            throw new websockets_1.WsException(messages_enum_1.Messages.SOCKET_NOT_FOUND);
        }
        console.log('After interceptor');
        client.user = socket.user;
        return call$;
    }
};
UserInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [clients_store_service_1.ClientsStoreService])
], UserInterceptor);
exports.UserInterceptor = UserInterceptor;
//# sourceMappingURL=user.interceptor.js.map