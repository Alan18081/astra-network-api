import { BaseRepository } from '../core/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Note } from './interfaces/note.interface';
import {Comment} from './interfaces/comment.interface';

@Injectable()
export class NotesRepository extends BaseRepository<Note> {

  constructor(@InjectModel('Note') noteModel: Model<Note>) {
    super(noteModel);
  }

  async findByIds(ids: string[]): Promise<Note[]> {
    return this.model.find({ _id: { $in: ids } });
  }

  async findOneByIdAndCommentId(noteId: string, commentId: string): Promise<Note | null> {
    return this.model.findOne({ _id: noteId, 'comments._id': commentId });
  }

  async addComment(noteId: string, comment: Partial<Comment>): Promise<Note | null> {
    return this.model.findByIdAndUpdate(noteId, { $push: { comments: comment } }, { new: true });
  }

  async removeComment(noteId: string, commentId: string): Promise<Note | null> {
    return this.model.findByIdAndUpdate({ _id: noteId }, { $pull: { 'comments._id': commentId } });
  }

  async addAnswerToComment(noteId: string, commentId: string, answer: Partial<Comment>): Promise<Note | null> {
    return this.model.findOneAndUpdate(
        { _id: noteId, 'comments._id': commentId },
        { $push: { 'comments.$.answers': answer } }
    );
  }

  async addLikeToNote(noteId: string, userId: string): Promise<Note | null> {
    return this.model.findOneAndUpdate(
        {_id: noteId, likedUsers: { $ne: userId } },
        { $inc: { likes: 1 }, $push: { likedUsers: userId } },
        { new: true }
    );
  }

  async removeLikeFromNote(noteId: string, userId: string): Promise<Note | null> {
    return this.model.findOneAndUpdate(
        {_id: noteId, likedUsers: userId },
        { $inc: { likes: -1 }, $pull: { likedUsers: userId } },
        { new: true }
    );
  }

  async addDislikeToNote(noteId: string, userId: string): Promise<Note | null> {
      return this.model.findOneAndUpdate(
          {_id: noteId, dislikedUsers: { $ne: userId } },
          { $inc: { dislikes: 1 }, $push: { dislikedUsers: userId } },
          { new: true }
      );
  }

  async removeDislikeFromNote(noteId: string, userId: string): Promise<Note | null> {
      return this.model.findOneAndUpdate(
          {_id: noteId, dislikedUsers: userId  },
          { $inc: { dislikes: -1 }, $pull: { dislikedUsers: userId } },
          { new: true }
      );
  }
}