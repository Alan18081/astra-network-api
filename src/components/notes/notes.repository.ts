import { BaseRepository } from '../core/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Note } from './note.interface';

@Injectable()
export class NotesRepository extends BaseRepository<Note> {

  constructor(@InjectModel('UserHash') noteModel: Model<Note>) {
    super(noteModel);
  }

  async findByIds(ids: string[]): Promise<Note[]> {
    return super.model.find({ _id: { $in: ids } });
  }

}