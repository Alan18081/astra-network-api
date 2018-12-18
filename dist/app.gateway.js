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
const messages_enum_1 = require("./helpers/enums/messages.enum");
const clients_store_service_1 = require("./components/core/services/clients-store.service");
const users_service_1 = require("./components/users/users.service");
const auth_service_1 = require("./components/auth/auth.service");
const ws_errors_1 = require("./helpers/ws/ws-errors");
const app_actions_1 = require("./app.actions");
let AppGateway = class AppGateway {
    constructor(clientsStoreService, usersService, authService) {
        this.clientsStoreService = clientsStoreService;
        this.usersService = usersService;
        this.authService = authService;
    }
    handleConnection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = client.handshake.query;
                if (!token) {
                    console.log('Empty token');
                    client.emit(ws_errors_1.AUTH_ERROR, new websockets_1.WsException(messages_enum_1.Messages.AUTH_TOKEN_NOT_FOUND));
                    return;
                }
                const data = this.authService.decodeToken(token);
                if (!data) {
                    console.log('Empty token');
                    client.emit(ws_errors_1.AUTH_ERROR, new websockets_1.WsException(messages_enum_1.Messages.INVALID_TOKEN));
                    return;
                }
                const user = yield this.authService.validateUser(data);
                if (!user) {
                    console.log('Empty user');
                    client.emit(ws_errors_1.AUTH_ERROR, new websockets_1.WsException(messages_enum_1.Messages.USER_NOT_FOUND));
                    return;
                }
                yield this.usersService.updateOne(user.id, { online: true });
                console.log('Adding socket to store');
                this.clientsStoreService.addSocket({
                    id: client.id,
                    socket: client,
                    user,
                });
                console.log(`User ID: ${user.id} successfully connected`);
                client.emit(app_actions_1.CONNECTED);
            }
            catch (e) {
                console.log(e);
                client.emit(ws_errors_1.SERVER_ERROR, new websockets_1.WsException(messages_enum_1.Messages.SERVER_ERROR));
            }
        });
    }
    handleDisconnect(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.clientsStoreService.removeSocket(client.id);
            }
            catch (e) {
                client.emit(ws_errors_1.SERVER_ERROR, new websockets_1.WsException(messages_enum_1.Messages.SERVER_ERROR));
            }
        });
    }
};
AppGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: '/' }),
    __metadata("design:paramtypes", [clients_store_service_1.ClientsStoreService,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map