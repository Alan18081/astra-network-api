"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var ClientsStoreService = /** @class */ (function () {
    function ClientsStoreService() {
        this.sockets = new Map();
        this.userIdsToSocketIds = new Map();
        this.socketIdsToUserIds = new Map();
    }
    ClientsStoreService.prototype.getSocketById = function (socketId) {
        console.log(socketId);
        var userId = this.socketIdsToUserIds.get(socketId);
        if (userId) {
            return this.sockets.get(JSON.stringify({ userId: userId, socketId: socketId }));
        }
    };
    ClientsStoreService.prototype.getSocketByUserId = function (userId) {
        var socketId = this.userIdsToSocketIds.get(userId);
        if (socketId) {
            return this.sockets.get(JSON.stringify({ userId: userId, socketId: socketId }));
        }
    };
    ClientsStoreService.prototype.addSocket = function (socket) {
        console.log(socket.id, socket.user.id);
        this.userIdsToSocketIds.set(socket.user.id, socket.id);
        this.socketIdsToUserIds.set(socket.id, socket.user.id);
        this.sockets.set(JSON.stringify({ userId: socket.user.id, socketId: socket.id }), socket);
    };
    ClientsStoreService.prototype.removeSocket = function (socketId) {
        var userId = this.socketIdsToUserIds.get(socketId);
        if (userId) {
            this.userIdsToSocketIds.delete(userId);
        }
        this.socketIdsToUserIds.delete(socketId);
        this.sockets.delete(JSON.stringify({ socketId: socketId, userId: userId }));
    };
    ClientsStoreService = __decorate([
        common_1.Injectable()
    ], ClientsStoreService);
    return ClientsStoreService;
}());
exports.ClientsStoreService = ClientsStoreService;
