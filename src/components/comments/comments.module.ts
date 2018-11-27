import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Comment} from './comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
  ],
  exports: [CommentsService],
  controllers: [],
  providers: [
    CommentsService,
  ],
})
export class CommentsModule {}