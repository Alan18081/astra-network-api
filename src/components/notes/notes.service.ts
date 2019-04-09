import {Injectable, NotFoundException} from '@nestjs/common';
import { Note } from './interfaces/note.interface';
import { NotesRepository } from './notes.repository';
import { FindNotesListDto } from './dto/find-notes-list.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {AddCommentDto} from './dto/add-comment.dto';
import {Messages} from '../../helpers/enums/messages.enum';
import {Comment} from './interfaces/comment.interface';
import {AddAnswerDto} from './dto/add-answer.dto';
import {Answer} from './interfaces/answer.interface';
import {RemoveCommentDto} from './dto/remove-comment.dto';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
  ) {}

  private async checkIsNoteExists(id: string): Promise<void> {
    const note = await this.findOne(id);
    if(!note) {
      throw new NotFoundException(Messages.NOTES_NOTE_IS_NOT_FOUND);
    }
  }

  async findMany({ ids, ...rest }: FindNotesListDto, skip: number, limit: number): Promise<Note[]> {
    if(ids) {
      return this.notesRepository.findByIds(ids, skip, limit);
    }
    return this.notesRepository.findManyWithFilter(rest, skip, limit);
  }

  async findOne(id: string): Promise<Note | null> {
    return this.notesRepository.findById(id);
  }

  async createOne({ title, description }: CreateNoteDto, userId: string): Promise<Note> {
    const note: Partial<Note> = {
        title,
        description,
        author: userId,
    };

    return this.notesRepository.save(note);
  }

  async updateById(id: string, payload: UpdateNoteDto): Promise<Note | null> {
    return this.notesRepository.updateById(id, payload);
  }

  async deleteById(id: string): Promise<void> {
    await this.notesRepository.deleteById(id);
  }

  async addComment(userId: string, { text, noteId }: AddCommentDto): Promise<Note | null> {
    await this.checkIsNoteExists(noteId);

    const newComment: Partial<Comment> = {
      author: userId,
      createdAt: new Date(),
      text,
      answers: []
    };

    return this.notesRepository.addComment(noteId, newComment);
  }

  async removeComment(userId: string, { noteId, commentId }: RemoveCommentDto): Promise<Note | null> {
    return this.notesRepository.removeComment(noteId, commentId);
  }

  async addAnswerToComment(userId: string, { text, noteId, commentId }: AddAnswerDto): Promise<Note | null> {
    const noteWithComment = await this.notesRepository.findOneByIdAndCommentId(noteId, commentId);
    if(!noteWithComment) {
      throw new NotFoundException(Messages.NOTES_NOTE_WITH_PROVIDED_COMMENT_IS_NOT_FOUND);
    }

    const newAnswer: Partial<Answer> = {
      author: userId,
      createdAt: new Date(),
      text
    };

    return this.notesRepository.addAnswerToComment(noteId, commentId, newAnswer);
  }

  async addLike(id: string, userId: string): Promise<Note | null> {
     await this.checkIsNoteExists(id);
     return this.notesRepository.addLikeToNote(id, userId);
  }

  async removeLike(id: string, userId: string): Promise<Note | null> {
     await this.checkIsNoteExists(id);
     return this.notesRepository.removeLikeFromNote(id, userId);
  }

  async addDislike(id: string, userId: string): Promise<Note | null> {
    await this.checkIsNoteExists(id);
    return this.notesRepository.addDislikeToNote(id, userId);
  }

  async removeDislike(id: string, userId: string): Promise<Note | null> {
    await this.checkIsNoteExists(id);
    return this.notesRepository.removeDislikeFromNote(id, userId);
  }

}