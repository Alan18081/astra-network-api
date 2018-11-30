import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';
import { ChatsController } from './chats.controller';
import { MessagesModule } from '../messages/messages.module';
import {UsersModule} from '../users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {AuthModule} from '../auth/auth.module';
import { ClientsStoreService } from './clients-store.service';
import { UserInterceptor } from './user.interceptor';

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
    ClientsStoreService,
    { provide: APP_INTERCEPTOR, useClass: UserInterceptor },
  ],
})
export class ChatsModule {}