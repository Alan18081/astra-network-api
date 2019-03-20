import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { FilesModule } from './components/files/files.module';
import { MessagesModule } from './components/messages/messages.module';
import { ChatsModule } from './components/chats/chats.module';
import { NotesModule } from './components/notes/notes.module';
import { RefreshTokensModule } from './components/refresh-tokens/refresh-tokens.module';
import { FriendshipRequestsModule } from './components/friendship-requests/friendship-requests.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL } from './config';
import { CoreModule } from './components/core/core.module';
import { EntityResolversModule } from './components/entity-resolvers/entity-resolvers.module';
import { ConfigService } from './components/core/services/config.service';



@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({  uri: config.get('DB_URL'), useMongoClient: true }),
      inject: [ConfigService]
    }),
    EntityResolversModule,
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
})
export class AppModule {}
