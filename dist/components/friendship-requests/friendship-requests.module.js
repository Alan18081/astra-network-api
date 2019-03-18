"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("../users/users.module");
const friendship_requests_service_1 = require("./friendship-requests.service");
const core_module_1 = require("../core/core.module");
const friendship_request_schema_1 = require("./friendship-request.schema");
const friendship_requests_repository_1 = require("./friendship-requests.repository");
const friendship_requests_resolver_1 = require("../entity-resolvers/resolvers/friendship-requests.resolver");
let FriendshipRequestsModule = class FriendshipRequestsModule {
};
FriendshipRequestsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'FriendshipRequest', schema: friendship_request_schema_1.FriendshipRequestSchema }]),
            users_module_1.UsersModule,
            core_module_1.CoreModule,
        ],
        providers: [
            friendship_requests_service_1.FriendshipRequestsService,
            friendship_requests_repository_1.FriendshipRequestsRepository,
            friendship_requests_resolver_1.FriendshipRequestsResolver
        ],
        exports: [
            friendship_requests_service_1.FriendshipRequestsService
        ]
    })
], FriendshipRequestsModule);
exports.FriendshipRequestsModule = FriendshipRequestsModule;
//# sourceMappingURL=friendship-requests.module.js.map