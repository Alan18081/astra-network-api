"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const users_module_1 = require("./components/users/users.module");
const auth_module_1 = require("./components/auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const files_module_1 = require("./components/files/files.module");
const messages_module_1 = require("./components/messages/messages.module");
const chats_module_1 = require("./components/chats/chats.module");
const notes_module_1 = require("./components/notes/notes.module");
const refresh_tokens_module_1 = require("./components/refresh-tokens/refresh-tokens.module");
const friendship_requests_module_1 = require("./components/friendship-requests/friendship-requests.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("./config");
const core_module_1 = require("./components/core/core.module");
const publisher_service_1 = require("./components/core/services/publisher.service");
const auth_service_1 = require("./components/auth/auth.service");
const messages_enum_1 = require("./helpers/enums/messages.enum");
const events_enum_1 = require("./helpers/enums/events.enum");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            graphql_1.GraphQLModule.forRootAsync({
                imports: [auth_module_1.AuthModule, core_module_1.CoreModule],
                useFactory: (publisherService, authService, jwtService) => {
                    return {
                        typePaths: ['./**/*.graphql'],
                        context: ({ req, connection }) => {
                            if (connection) {
                                return connection.context;
                            }
                            return {
                                req
                            };
                        },
                        installSubscriptionHandlers: true,
                        subscriptions: {
                            onConnect(connectionParams, webSocket) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    const { Authorization } = connectionParams;
                                    if (!Authorization) {
                                        throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_TOKEN);
                                    }
                                    const token = Authorization.split(' ')[1];
                                    if (!token) {
                                        throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_TOKEN);
                                    }
                                    const payload = jwtService.verify(token);
                                    if (!payload) {
                                        throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_TOKEN);
                                    }
                                    const user = yield authService.validateUser(payload);
                                    if (!user) {
                                        throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);
                                    }
                                    yield publisherService.publish(events_enum_1.Events.USER_STATUS_CHANGED, user);
                                    console.log('Auth user', user);
                                    return {
                                        user
                                    };
                                });
                            }
                        }
                    };
                },
                inject: [publisher_service_1.PublisherService, auth_service_1.AuthService, jwt_1.JwtService]
            }),
            mongoose_1.MongooseModule.forRoot(config_1.DB_URL),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            core_module_1.CoreModule,
            files_module_1.FilesModule,
            messages_module_1.MessagesModule,
            chats_module_1.ChatsModule,
            notes_module_1.NotesModule,
            refresh_tokens_module_1.RefreshTokensModule,
            friendship_requests_module_1.FriendshipRequestsModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map