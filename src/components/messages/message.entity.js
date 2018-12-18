"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../users/user.entity");
var chat_entity_1 = require("../chats/chat.entity");
var Message = /** @class */ (function () {
    function Message() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Message.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('varchar')
    ], Message.prototype, "text", void 0);
    __decorate([
        typeorm_1.Column()
    ], Message.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.PrimaryColumn()
    ], Message.prototype, "userId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_entity_1.User; }),
        typeorm_1.JoinColumn()
    ], Message.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return chat_entity_1.Chat; }, function (chat) { return chat.messages; }),
        typeorm_1.JoinColumn()
    ], Message.prototype, "chat", void 0);
    Message = __decorate([
        typeorm_1.Entity()
    ], Message);
    return Message;
}());
exports.Message = Message;
