import { Note } from '../interfaces/note.interface';
import { NotesService } from '../notes.service';
import { FindNotesListDto } from '../dto/find-notes-list.dto';
import { User } from '../../users/user.interface';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { UsersService } from '../../users/users.service';
import { PublisherService } from '../../core/services/publisher.service';
export declare class NotesResolver {
    private readonly notesService;
    private readonly usersService;
    private readonly publisherService;
    constructor(notesService: NotesService, usersService: UsersService, publisherService: PublisherService);
    author(note: Note): Promise<User | null>;
    notesList(dto: FindNotesListDto): Promise<Note[]>;
    findNoteById(id: string): Promise<Note | null>;
    createNote(user: User, noteDto: CreateNoteDto): Promise<Note>;
    updateNote(id: string, noteDto: UpdateNoteDto): Promise<Note | null>;
    deleteNote(id: string): Promise<void>;
    addLikePost(user: User, id: string): Promise<Note | null>;
    removeLikePost(user: User, id: string): Promise<Note | null>;
    addDislikePost(user: User, id: string): Promise<Note | null>;
    removeDislikePost(user: User, id: string): Promise<Note | null>;
    noteAdded(): Promise<{
        resolve(payload: any): any;
        subscribe: () => AsyncIterator<{}>;
    }>;
}
