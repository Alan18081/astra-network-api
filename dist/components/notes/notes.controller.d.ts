import { NotesService } from './notes.service';
import { User } from '../users/user.entity';
import { Note } from './note.entity';
import { FindNotesListDto } from './dto/find-notes-list.dto';
import { FindOneNoteDto } from './dto/find-one-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesGateway } from './notes.gateway';
export declare class NotesController {
    private readonly notesService;
    private readonly notesGateway;
    constructor(notesService: NotesService, notesGateway: NotesGateway);
    findMany(query: FindNotesListDto): Promise<Note[]>;
    findOne(id: number, query: FindOneNoteDto): Promise<Note | undefined>;
    createOne(user: User, payload: CreateNoteDto): Promise<Note | undefined>;
    updateOne(id: number, payload: UpdateNoteDto): Promise<Note | undefined>;
    deleteOne(user: User, id: number): Promise<void>;
}
