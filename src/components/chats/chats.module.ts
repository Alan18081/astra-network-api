import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MessagesModule } from '../messages/messages.module';
import {UsersModule} from '../users/users.module';
import {AuthModule} from '../auth/auth.module';
import {CoreModule} from '../core/core.module';
import { ChatsRepository } from './chats.repository';
import { ChatsResolver } from './chats.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './chat.schema';

@Module({
  imports: [
    MessagesModule,
    UsersModule,
    AuthModule,
    CoreModule,
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])
  ],
  providers: [
    ChatsService,
    ChatsRepository,
    ChatsResolver,
  ],
})
export class ChatsModule {}