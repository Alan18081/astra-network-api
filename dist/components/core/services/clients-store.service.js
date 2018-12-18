"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let ClientsStoreService = class ClientsStoreService {
    constructor() {
        this.sockets = new Map();
        this.userIdsToSocketIds = new Map();
        this.socketIdsToUserIds = new Map();
    }
    getSocketById(socketId) {
        console.log(socketId);
        const userId = this.socketIdsToUserIds.get(socketId);
        if (userId) {
            return this.sockets.get(JSON.stringify({ userId, socketId }));
        }
    }
    getSocketByUserId(userId) {
        const socketId = this.userIdsToSocketIds.get(userId);
        if (socketId) {
            return this.sockets.get(JSON.stringify({ userId, socketId }));
        }
    }
    addSocket(socket) {
        console.log(socket.id, socket.user.id);
        this.userIdsToSocketIds.set(socket.user.id, socket.id);
        this.socketIdsToUserIds.set(socket.id, socket.user.id);
        this.sockets.set(JSON.stringify({ userId: socket.user.id, socketId: socket.id }), socket);
    }
    removeSocket(socketId) {
        const userId = this.socketIdsToUserIds.get(socketId);
        if (userId) {
            this.userIdsToSocketIds.delete(userId);
        }
        this.socketIdsToUserIds.delete(socketId);
        this.sockets.delete(JSON.stringify({ socketId, userId }));
    }
};
ClientsStoreService = __decorate([
    common_1.Injectable()
], ClientsStoreService);
exports.ClientsStoreService = ClientsStoreService;
//# sourceMappingURL=clients-store.service.js.map