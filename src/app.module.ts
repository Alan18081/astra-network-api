import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORM_CONFIG } from './config';
import { AuthModule } from './components/auth/auth.module';
import { FilesModule } from './components/files/files.module';
import { MessagesModule } from './components/messages/messages.module';
import { ChatsModule } from './components/chats/chats.module';
import { NotesModule } from './components/notes/notes.module';
import { RefreshTokensModule } from './components/refresh-tokens/refresh-tokens.module';
import { AppGateway } from './app.gateway';
import { FriendshipRequestsModule } from './components/friendship-requests/friendship-requests.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_CONFIG),
    UsersModule,
    AuthModule,
    FilesModule,
    MessagesModule,
    ChatsModule,
    NotesModule,
    RefreshTokensModule,
    FriendshipRequestsModule
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
