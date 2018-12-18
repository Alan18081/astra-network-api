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
var file_entity_1 = require("../files/file.entity");
var comment_entity_1 = require("../comments/comment.entity");
var user_entity_1 = require("../users/user.entity");
var base_entity_1 = require("../core/base.entity");
var Note = /** @class */ (function (_super) {
    __extends(Note, _super);
    function Note() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column('varchar')
    ], Note.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], Note.prototype, "description", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return file_entity_1.File; }),
        typeorm_1.JoinTable()
    ], Note.prototype, "files", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return comment_entity_1.Comment; }, function (comment) { return comment.note; })
    ], Note.prototype, "comments", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Note.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Note.prototype, "groupId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_entity_1.User; }, function (user) { return user.notes; }),
        typeorm_1.JoinColumn({ name: 'userId' })
    ], Note.prototype, "user", void 0);
    Note = __decorate([
        typeorm_1.Entity()
    ], Note);
    return Note;
}(base_entity_1.BaseEntity));
exports.Note = Note;
