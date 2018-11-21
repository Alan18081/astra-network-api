import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Module({
  imports: [],
  exports: [],
  controllers: [],
  providers: [
    CommentsService,
  ],
})
export class CommentsModule {}