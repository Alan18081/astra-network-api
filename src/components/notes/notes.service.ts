import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import {FindManyOptions, Repository} from 'typeorm';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { User } from '../users/user.entity';
import { FindNotesListDto } from './dto/find-notes-list.dto';
import { FindOneNoteDto } from './dto/find-one-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { PaginationDto } from '../core/dto/pagination.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async findMany(query: FindNotesListDto): Promise<Note[]> {
    const options: FindManyOptions<Note> = {
      where: {},
      relations: ['user'],
    };

    if (query.userId) {
      options.where = {
        userId: query.userId,
      };
    }

    options.relations = this.getRelations(query);
    return await this.notesRepository.find(options);
  }

  async findManyByIds(query: FindNotesListDto): Promise<Note[]> {
    const relations = this.getRelations(query);
    return await this.notesRepository.findByIds(query.ids, { relations });
  }

  private getRelations(query: FindNotesListDto | FindOneNoteDto): string[] {
    const relations: string[] = ['user'];

    if (query.includeFiles) {
      relations.push('files');
    }

    return relations;
  }

  async findManyWithPagination(query: FindNotesListDto & Required<PaginationDto>): Promise<PaginatedResult<Note>> {
    const options: FindManyOptions<Note> = {
      where: {},
      relations: [],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    };

    if (query.userId) {
      options.where = {
        userId: query.userId,
      };
    }

    options.relations = this.getRelations(query);

    const [data, totalCount] = await this.notesRepository.findAndCount(
      options,
    );

    return {
      page: query.page,
      itemsPerPage: query.limit,
      totalCount,
      data,
    };
  }

  async findOne(id: number, query: FindOneNoteDto): Promise<Note | undefined> {
    const relations = this.getRelations(query);

    return await this.notesRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  async createOne(payload: CreateNoteDto, userId: number): Promise<Note | undefined> {
    const note = new Note();

    note.title = payload.title;
    note.description = payload.description;
    note.createdAt = new Date();
    note.user = { id: userId } as User;

    await this.notesRepository.save(note);
    return await this.findOne(note.id, { includeFiles: true });
  }

  async updateOne(id: number, payload: UpdateNoteDto): Promise<Note | undefined> {
    await this.notesRepository.update(id, payload);

    return await this.findOne(id, { includeFiles: true });
  }

  async deleteOne(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}