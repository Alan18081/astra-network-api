import { Module, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AnswersResolver } from './resolvers/answers.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import { ChatsResolver } from './resolvers/chats.resolver';
import { CommentsResolver } from './resolvers/comments.resolver';
import { FilesResolver } from './resolvers/files.resolver';
import { FriendshipRequestsResolver } from './resolvers/friendship-requests.resolver';
import { MessagesResolver } from './resolvers/messages.resolver';
import { NotesResolver } from './resolvers/notes.resolver';
import { UsersResolver } from './resolvers/users.resolver';
import { NotesModule } from '../notes/notes.module';
import { AuthModule } from '../auth/auth.module';
import { ChatsModule } from '../chats/chats.module';
import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from '../users/users.module';
import { FilesModule } from '../files/files.module';
import { FriendshipRequestsModule } from '../friendship-requests/friendship-requests.module';
import { CoreModule } from '../core/core.module';
import { PublisherService } from '../core/services/publisher.service';
import { AuthService } from '../auth/auth.service';
import { Messages } from '../../helpers/enums/messages.enum';
import { Events } from '../../helpers/enums/events.enum';
import { JwtService } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [AuthModule, CoreModule],
      useFactory: (publisherService: PublisherService, authService: AuthService, jwtService: JwtService) => {
        return {
          typePaths: ['./**/*.graphql'],
          context: ({ req, connection }) => {
            if(connection) {
              return connection.context;
            }

            return {
              req
            };
          },
          installSubscriptionHandlers: true,
          subscriptions: {
            async onConnect(connectionParams, webSocket) {
              const { Authorization } = connectionParams as { Authorization: string };
              console.log('User is connecting');
              if(!Authorization) {
                throw new UnauthorizedException(Messages.INVALID_TOKEN);
              }

              const token = Authorization.split(' ')[1];

              if(!token) {
                throw new UnauthorizedException(Messages.INVALID_TOKEN);
              }

              const payload = jwtService.verify(token);

              if(!payload) {
                throw new UnauthorizedException(Messages.INVALID_TOKEN);
              }

              const user = await authService.validateUser(payload);
              if(!user) {
                throw new NotFoundException(Messages.USER_NOT_FOUND);
              }

              await publisherService.publish(Events.USER_STATUS_CHANGED, user);
              return {
                user
              };
            }
          }
        };
      },
      inject: [PublisherService, AuthService, JwtService]
    }),
    NotesModule,
    AuthModule,
    ChatsModule,
    MessagesModule,
    UsersModule,
    FilesModule,
    FriendshipRequestsModule
  ],
  providers: [
    AnswersResolver,
    AuthResolver,
    ChatsResolver,
    CommentsResolver,
    FilesResolver,
    FriendshipRequestsResolver,
    MessagesResolver,
    NotesResolver,
    UsersResolver
  ]
})
export class EntityResolversModule {}