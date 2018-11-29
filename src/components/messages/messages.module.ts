import {Module} from '@nestjs/common';
import {MessagesService} from './messages.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Message} from './message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [],
  exports: [MessagesService],
  providers: [MessagesService],
})
export class MessagesModule {}