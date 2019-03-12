import {Module} from '@nestjs/common';
import {MessagesService} from './messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './message.schema';
import { MessagesRepository } from './messages.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}]),
  ],
  controllers: [],
  exports: [MessagesService],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}