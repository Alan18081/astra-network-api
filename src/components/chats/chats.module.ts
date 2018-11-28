import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';
import { ChatsController } from './chats.controller';
import { MessagesModule } from '../messages/messages.module';
import {UsersModule} from '../users/users.module';
import {APP_GUARD} from '@nestjs/core';
import {AuthSocketGuard} from './auth-socket.guard';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [
    MessagesModule,
    TypeOrmModule.forFeature([Chat]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ChatsController],
  providers: [
    ChatsGateway,
    ChatsService,
    { provide: APP_GUARD, useClass: AuthSocketGuard },
  ],
})
export class ChatsModule {}