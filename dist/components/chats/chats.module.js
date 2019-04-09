"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const core_module_1 = require("../core/core.module");
const chats_repository_1 = require("./chats.repository");
const mongoose_1 = require("@nestjs/mongoose");
const chat_schema_1 = require("./chat.schema");
let ChatsModule = class ChatsModule {
};
ChatsModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            core_module_1.CoreModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Chat', schema: chat_schema_1.ChatSchema }]),
        ],
        providers: [
            chats_service_1.ChatsService,
            chats_repository_1.ChatsRepository,
        ],
        exports: [chats_service_1.ChatsService]
    })
], ChatsModule);
exports.ChatsModule = ChatsModule;
//# sourceMappingURL=chats.module.js.map