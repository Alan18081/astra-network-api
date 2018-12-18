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
var user_entity_1 = require("../users/user.entity");
var FriendshipRequest = /** @class */ (function (_super) {
    __extends(FriendshipRequest, _super);
    function FriendshipRequest(data) {
        var _this = _super.call(this) || this;
        Object.assign(_this, data);
        return _this;
    }
    __decorate([
        typeorm_1.Column()
    ], FriendshipRequest.prototype, "receiverId", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return user_entity_1.User; }),
        typeorm_1.JoinColumn({ name: 'receiverId' })
    ], FriendshipRequest.prototype, "receiver", void 0);
    __decorate([
        typeorm_1.Column()
    ], FriendshipRequest.prototype, "senderId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_entity_1.User; }),
        typeorm_1.JoinColumn({ name: 'senderId' })
    ], FriendshipRequest.prototype, "sender", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', nullable: true, length: 50 })
    ], FriendshipRequest.prototype, "message", void 0);
    FriendshipRequest = __decorate([
        typeorm_1.Entity()
    ], FriendshipRequest);
    return FriendshipRequest;
}(base_entity_1.BaseEntity));
exports.FriendshipRequest = FriendshipRequest;
