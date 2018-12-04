import { Repository } from 'typeorm';
import { Note } from '../note.entity';

export class NotesRepository extends Repository<Note> {}