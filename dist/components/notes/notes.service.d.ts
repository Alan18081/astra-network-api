import { Note } from './interfaces/note.interface';
import { NotesRepository } from './notes.repository';
import { FindNotesListDto } from './dto/find-notes-list.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { AddAnswerDto } from './dto/add-answer.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';
export declare class NotesService {
    private readonly notesRepository;
    constructor(notesRepository: NotesRepository);
    private checkIsNoteExists;
    findMany({ ids }: FindNotesListDto, skip: number, limit: number): Promise<Note[]>;
    findOne(id: string): Promise<Note | null>;
    createOne({ title, description }: CreateNoteDto, userId: string): Promise<Note>;
    updateById(id: string, payload: UpdateNoteDto): Promise<Note | null>;
    deleteById(id: string): Promise<void>;
    addComment(userId: string, { text, noteId }: AddCommentDto): Promise<Note | null>;
    removeComment(userId: string, { noteId, commentId }: RemoveCommentDto): Promise<Note | null>;
    addAnswerToComment(userId: string, { text, noteId, commentId }: AddAnswerDto): Promise<Note | null>;
    addLike(id: string, userId: string): Promise<Note | null>;
    removeLike(id: string, userId: string): Promise<Note | null>;
    addDislike(id: string, userId: string): Promise<Note | null>;
    removeDislike(id: string, userId: string): Promise<Note | null>;
}
