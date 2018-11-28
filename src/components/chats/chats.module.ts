import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';
import { ChatsController } from './chats.controller';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [
    MessagesModule,
    TypeOrmModule.forFeature([Chat]),
  ],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}