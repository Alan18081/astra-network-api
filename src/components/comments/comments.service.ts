import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {Comment} from './comment.interface';
import {CommentsRepository} from './comments.repository';

@Injectable()
export class CommentsService {

  constructor(
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async createOne(payload: CreateCommentDto, userId: string): Promise<Comment> {
    const newComment: Partial<Comment> = {
      ...payload,
      user: userId,
    };

    return this.commentsRepository.save(newComment);
  }

  async updateById(id: string, payload: UpdateCommentDto): Promise<Comment | null> {
    return this.commentsRepository.updateById(id, payload);
  }

  async deleteOne(id: string): Promise<void> {
    await this.commentsRepository.deleteById(id);
  }
}