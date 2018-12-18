import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { FindNotesListDto } from './dto/find-notes-list.dto';
import { FindOneNoteDto } from './dto/find-one-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { PaginationDto } from '../core/dto/pagination.dto';
export declare class NotesService {
    private readonly notesRepository;
    constructor(notesRepository: Repository<Note>);
    findMany(query: FindNotesListDto): Promise<Note[]>;
    findManyByIds(query: FindNotesListDto): Promise<Note[]>;
    private getRelations;
    findManyWithPagination(query: FindNotesListDto & Required<PaginationDto>): Promise<PaginatedResult<Note>>;
    findOne(id: number, query: FindOneNoteDto): Promise<Note | undefined>;
    createOne(payload: CreateNoteDto, userId: number): Promise<Note | undefined>;
    updateOne(id: number, payload: UpdateNoteDto): Promise<Note | undefined>;
    deleteOne(id: number): Promise<void>;
}
