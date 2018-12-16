import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';
import { ChatsController } from './chats.controller';
import { MessagesModule } from '../messages/messages.module';
import {UsersModule} from '../users/users.module';
import {AuthModule} from '../auth/auth.module';
import {CoreModule} from '../core/core.module';

@Module({
  imports: [
    MessagesModule,
    TypeOrmModule.forFeature([Chat]),
    UsersModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [ChatsController],
  providers: [
    ChatsGateway,
    ChatsService,
  ],
})
export class ChatsModule {}