import { Note } from '../../notes/interfaces/note.interface';
import { NotesService } from '../../notes/notes.service';
import { FindNotesListDto } from '../../notes/dto/find-notes-list.dto';
import { User } from '../../users/user.interface';
import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { UpdateNoteDto } from '../../notes/dto/update-note.dto';
import { UsersService } from '../../users/users.service';
import { PublisherService } from '../../core/services/publisher.service';
import { AddCommentDto } from '../../notes/dto/add-comment.dto';
import { RemoveCommentDto } from '../../notes/dto/remove-comment.dto';
import { AddAnswerDto } from '../../notes/dto/add-answer.dto';
export declare class NotesResolver {
    private readonly notesService;
    private readonly usersService;
    private readonly publisherService;
    constructor(notesService: NotesService, usersService: UsersService, publisherService: PublisherService);
    author(note: Note): Promise<User | null>;
    notesList(dto: FindNotesListDto, skip?: number, limit?: number): Promise<Note[]>;
    findNoteById(id: string): Promise<Note | null>;
    createNote(user: User, noteDto: CreateNoteDto): Promise<Note>;
    updateNote(id: string, noteDto: UpdateNoteDto): Promise<Note | null>;
    deleteNote(id: string): Promise<void>;
    addLikePost(user: User, id: string): Promise<Note | null>;
    removeLikePost(user: User, id: string): Promise<Note | null>;
    addDislikePost(user: User, id: string): Promise<Note | null>;
    removeDislikePost(user: User, id: string): Promise<Note | null>;
    addComment(user: User, dto: AddCommentDto): Promise<Note | null>;
    removeComment(user: User, dto: RemoveCommentDto): Promise<Note | null>;
    addAnswerToComment(user: User, dto: AddAnswerDto): Promise<Note | null>;
    noteAdded(): {
        resolve(payload: any): any;
        subscribe: () => AsyncIterator<{}>;
    };
}
