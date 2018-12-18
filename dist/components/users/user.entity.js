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
var User_1;
"use strict";
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../core/base.entity");
const chat_entity_1 = require("../chats/chat.entity");
const note_entity_1 = require("../notes/note.entity");
const class_transformer_1 = require("class-transformer");
let User = User_1 = class User extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_transformer_1.Expose(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "phoneVerified", void 0);
__decorate([
    typeorm_1.ManyToMany(type => chat_entity_1.Chat, chat => chat.users),
    __metadata("design:type", Array)
], User.prototype, "chats", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "online", void 0);
__decorate([
    typeorm_1.OneToMany(type => note_entity_1.Note, note => note.user),
    __metadata("design:type", Array)
], User.prototype, "notes", void 0);
__decorate([
    typeorm_1.ManyToMany(type => User_1, user => user.friends),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map