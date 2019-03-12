import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {MongooseModule} from '@nestjs/mongoose';
import {CommentSchema} from './comment.schema';
import {CommentsRepository} from './comments.repository';

@Module({
  imports: [
      MongooseModule.forFeature([{name: 'Comment', schema: CommentSchema }])
  ],
  exports: [CommentsService],
  controllers: [],
  providers: [
    CommentsService,
    CommentsRepository
  ],
})
export class CommentsModule {}