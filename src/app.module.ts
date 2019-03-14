import { Module, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { FilesModule } from './components/files/files.module';
import { MessagesModule } from './components/messages/messages.module';
import { ChatsModule } from './components/chats/chats.module';
import { NotesModule } from './components/notes/notes.module';
import { RefreshTokensModule } from './components/refresh-tokens/refresh-tokens.module';
import { AppGateway } from './app.gateway';
import { FriendshipRequestsModule } from './components/friendship-requests/friendship-requests.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL } from './config';
import { CoreModule } from './components/core/core.module';
import { PublisherService } from './components/core/services/publisher.service';
import { AuthService } from './components/auth/auth.service';
import { Messages } from './helpers/enums/messages.enum';
import { Events } from './helpers/enums/events.enum';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [AuthModule, CoreModule],
      useFactory: (publisherService: PublisherService, authService: AuthService, jwtService: JwtService) => {
        return {
          typePaths: ['./**/*.graphql'],
          context: ({ req }) => ({ req }),
          subscriptions: {
            async onConnect(connectionParams, webSocket) {
              const { token } = connectionParams as { token: string };

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
            }
          }
        };
      },
      inject: [PublisherService, AuthService, JwtService]
    }),
    MongooseModule.forRoot(DB_URL),
    UsersModule,
    AuthModule,
    CoreModule,
    FilesModule,
    MessagesModule,
    ChatsModule,
    NotesModule,
    RefreshTokensModule,
    FriendshipRequestsModule
  ],
  controllers: [],
  providers: [
    AppGateway,
  ],
})
export class AppModule {}
