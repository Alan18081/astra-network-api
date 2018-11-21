import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async createOne(payload: CreateCommentDto, user: User): Promise<Comment> {
    const newComment = {
      ...new Comment(),
      ...payload,
      author: user,
    };

    return await this.commentsRepository.save(newComment);
  }

  async updateOne(id: number, payload: UpdateCommentDto): Promise<Comment | undefined> {
    await this.commentsRepository.update(id, { ...payload });
  }

  async deleteOne(id: number): Promise<void> {
    
  }
}