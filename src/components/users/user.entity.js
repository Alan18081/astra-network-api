"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../core/base.entity");
var chat_entity_1 = require("../chats/chat.entity");
var note_entity_1 = require("../notes/note.entity");
var class_transformer_1 = require("class-transformer");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User_1 = User;
    var User_1;
    __decorate([
        typeorm_1.Column({ type: 'varchar' })
    ], User.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar' })
    ], User.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "age", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Index()
    ], User.prototype, "email", void 0);
    __decorate([
        class_transformer_1.Expose(),
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "googleId", void 0);
    __decorate([
        typeorm_1.Column({ type: 'boolean', default: false })
    ], User.prototype, "emailVerified", void 0);
    __decorate([
        typeorm_1.Column({ type: 'boolean', default: false })
    ], User.prototype, "phoneVerified", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return chat_entity_1.Chat; }, function (chat) { return chat.users; })
    ], User.prototype, "chats", void 0);
    __decorate([
        typeorm_1.Column({ type: 'boolean', default: false })
    ], User.prototype, "online", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return note_entity_1.Note; }, function (note) { return note.user; })
    ], User.prototype, "notes", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1; }, function (user) { return user.friends; })
    ], User.prototype, "friends", void 0);
    User = User_1 = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(base_entity_1.BaseEntity));
exports.User = User;
