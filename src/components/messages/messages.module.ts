import {Module} from '@nestjs/common';
import {MessagesService} from './messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './message.schema';
import { MessagesRepository } from './messages.repository';
import { MessagesResolver } from '../entity-resolvers/resolvers/messages.resolver';
import { CoreModule } from '../core/core.module';
import { ChatsModule } from '../chats/chats.module';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}]),
    ChatsModule
  ],
  controllers: [],
  exports: [MessagesService],
  providers: [MessagesService, MessagesRepository, MessagesResolver],
})
export class MessagesModule {}