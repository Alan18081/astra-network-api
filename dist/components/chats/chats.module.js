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
const chats_gateway_1 = require("./chats.gateway");
const chats_service_1 = require("./chats.service");
const chat_entity_1 = require("./chat.entity");
const chats_controller_1 = require("./chats.controller");
const messages_module_1 = require("../messages/messages.module");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const core_module_1 = require("../core/core.module");
let ChatsModule = class ChatsModule {
};
ChatsModule = __decorate([
    common_1.Module({
        imports: [
            messages_module_1.MessagesModule,
            typeorm_1.TypeOrmModule.forFeature([chat_entity_1.Chat]),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            core_module_1.CoreModule,
        ],
        controllers: [chats_controller_1.ChatsController],
        providers: [
            chats_gateway_1.ChatsGateway,
            chats_service_1.ChatsService,
        ],
    })
], ChatsModule);
exports.ChatsModule = ChatsModule;
//# sourceMappingURL=chats.module.js.map