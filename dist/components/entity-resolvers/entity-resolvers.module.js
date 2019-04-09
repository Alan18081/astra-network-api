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
const answers_resolver_1 = require("./resolvers/answers.resolver");
const auth_resolver_1 = require("./resolvers/auth.resolver");
const chats_resolver_1 = require("./resolvers/chats.resolver");
const comments_resolver_1 = require("./resolvers/comments.resolver");
const files_resolver_1 = require("./resolvers/files.resolver");
const friendship_requests_resolver_1 = require("./resolvers/friendship-requests.resolver");
const messages_resolver_1 = require("./resolvers/messages.resolver");
const notes_resolver_1 = require("./resolvers/notes.resolver");
const users_resolver_1 = require("./resolvers/users.resolver");
const notes_module_1 = require("../notes/notes.module");
const auth_module_1 = require("../auth/auth.module");
const chats_module_1 = require("../chats/chats.module");
const messages_module_1 = require("../messages/messages.module");
const users_module_1 = require("../users/users.module");
const files_module_1 = require("../files/files.module");
const friendship_requests_module_1 = require("../friendship-requests/friendship-requests.module");
const core_module_1 = require("../core/core.module");
const publisher_service_1 = require("../core/services/publisher.service");
const auth_service_1 = require("../auth/auth.service");
const messages_enum_1 = require("../../helpers/enums/messages.enum");
const events_enum_1 = require("../../helpers/enums/events.enum");
const jwt_1 = require("@nestjs/jwt");
const graphql_1 = require("@nestjs/graphql");
let EntityResolversModule = class EntityResolversModule {
};
EntityResolversModule = __decorate([
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
                                    console.log('User is connecting');
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
            notes_module_1.NotesModule,
            auth_module_1.AuthModule,
            chats_module_1.ChatsModule,
            messages_module_1.MessagesModule,
            users_module_1.UsersModule,
            files_module_1.FilesModule,
            friendship_requests_module_1.FriendshipRequestsModule
        ],
        providers: [
            answers_resolver_1.AnswersResolver,
            auth_resolver_1.AuthResolver,
            chats_resolver_1.ChatsResolver,
            comments_resolver_1.CommentsResolver,
            files_resolver_1.FilesResolver,
            friendship_requests_resolver_1.FriendshipRequestsResolver,
            messages_resolver_1.MessagesResolver,
            notes_resolver_1.NotesResolver,
            users_resolver_1.UsersResolver
        ]
    })
], EntityResolversModule);
exports.EntityResolversModule = EntityResolversModule;
//# sourceMappingURL=entity-resolvers.module.js.map