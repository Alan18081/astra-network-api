"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const friendship_requests_gateway_1 = require("./friendship-requests.gateway");
const friendship_requests_service_1 = require("./friendship-requests.service");
const friendship_request_entity_1 = require("./friendship-request.entity");
const core_module_1 = require("../core/core.module");
let FriendshipRequestsModule = class FriendshipRequestsModule {
};
FriendshipRequestsModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([friendship_request_entity_1.FriendshipRequest]),
            users_module_1.UsersModule,
            core_module_1.CoreModule,
        ],
        providers: [friendship_requests_gateway_1.FriendshipRequestsGateway, friendship_requests_service_1.FriendshipRequestsService]
    })
], FriendshipRequestsModule);
exports.FriendshipRequestsModule = FriendshipRequestsModule;
//# sourceMappingURL=friendship-requests.module.js.map