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
import { ClientsStoreService } from '../core/services/clients-store.service';
import { UserInterceptor } from '../../helpers/interceptors/user.interceptor';
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
    { provide: APP_INTERCEPTOR, useClass: UserInterceptor },
  ],
})
export class ChatsModule {}