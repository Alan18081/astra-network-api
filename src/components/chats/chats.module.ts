import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import {UsersModule} from '../users/users.module';
import {AuthModule} from '../auth/auth.module';
import {CoreModule} from '../core/core.module';
import { ChatsRepository } from './chats.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './chat.schema';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CoreModule,
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
  ],
  providers: [
    ChatsService,
    ChatsRepository,
  ],
  exports: [ChatsService]
})
export class ChatsModule {}