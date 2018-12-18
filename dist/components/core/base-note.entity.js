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
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const file_entity_1 = require("../files/file.entity");
const comment_entity_1 = require("../comments/comment.entity");
class BaseNote extends base_entity_1.BaseEntity {
}
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], BaseNote.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BaseNote.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToMany(type => file_entity_1.File),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], BaseNote.prototype, "files", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, comment => comment.note),
    __metadata("design:type", Array)
], BaseNote.prototype, "comments", void 0);
exports.BaseNote = BaseNote;
//# sourceMappingURL=base-note.entity.js.map