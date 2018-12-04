import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoreModule } from '../../core/core.module';
import { PaginatedResult } from '../../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { mockRepository } from '../../../helpers/test-helpers/mock-repository';
import { Note } from '../note.entity';
import { NotesService } from '../notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';

describe('UsersService', () => {
  let notesService;
  const mockNotes = [new Note(), new Note()];


  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [NotesService, { provide: getRepositoryToken(Note), useValue: mockRepository }]
    }).compile();

    notesService = module.get<NotesService>(NotesService);
    jest.spyOn(notesService, 'getRelations').mockImplementation(() => ['user']);
  });

  describe('findMany', () => {

    it('should return an array', async () => {
      jest.spyOn(mockRepository, 'find').mockImplementation(async () => mockNotes);

      expect(await notesService.findMany({  })).toBe(mockNotes);
    });

  });

  describe('findManyWithPagination', () => {
    const query: PaginationDto = {
      page: 1,
      limit: 2
    };
    const paginatedResult: PaginatedResult<Note> = {
      itemsPerPage: query.limit,
      totalCount: 5,
      page: query.page,
      data: mockNotes,
    };

    it('should return paginated result', async () => {
      jest.spyOn(mockRepository, 'findAndCount').mockImplementation(async () => [mockNotes, 5]);

      expect( await notesService.findManyWithPagination(query)).toEqual(paginatedResult);
    });

  });

  describe('findOne', () => {
    it('should return note', async () => {
      const result = new Note();
      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);

      expect(await notesService.findOne(5)).toEqual(result);
    });
  });

  describe('createOne', () => {
    it('should create new note and return it', async () => {
      const payload: CreateNoteDto = {
        title: 'Alan',
        fileIds: [4],
      };

      const result = {
        ...new Note(),
        ...payload,
      };

      jest.spyOn(mockRepository, 'save').mockImplementation(async () => {});
      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);

      expect(await notesService.createOne(payload, 5)).toEqual(result);
    });
  });

  describe('updateOne', () => {
    it('should update user and returns it', async () => {
      const payload = {
        firstName: 'Alan',
        lastName: 'Morgan',
      };

      const result = {
        ...new Note(),
        id: 5,
        firstName: 'Alan',
        lastName: 'Morgan',
        email: 'gogunov00@gmail.com',
        googleId: '54545454',
        emailVerified: false,
        phoneVerified: false,
        online: true,
        createdAt: new Date()
      };

      jest.spyOn(mockRepository, 'update').mockImplementation(async () => result);
      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);

      expect(await notesService.updateOne(result.id, payload)).toEqual(result);
    });
  });

});