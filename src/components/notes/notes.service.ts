import { Injectable } from '@nestjs/common';
import { Note } from './note.interface';
import { NotesRepository } from './notes.repository';
import { FindNotesListDto } from './dto/find-notes-list.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
  ) {}

  async findMany(query: FindNotesListDto): Promise<Note[]> {
    if(query.ids) {
      return this.notesRepository.findByIds(query.ids);
    }
    return this.notesRepository.findMany({});
  }

  async findOne(id: string): Promise<Note | null> {
    return this.notesRepository.findById(id);
  }

  async createOne(payload: CreateNoteDto, userId: string): Promise<Note | undefined> {
    const note: Partial<Note> = {};

    note.title = payload.title;
    note.description = payload.description;
    note.user = userId;

    return this.notesRepository.save(note);
  }

  async updateById(id: string, payload: UpdateNoteDto): Promise<Note | null> {
    return this.notesRepository.updateById(id, payload);
  }

  async deleteOne(id: string): Promise<void> {
    await this.notesRepository.deleteById(id);
  }
}