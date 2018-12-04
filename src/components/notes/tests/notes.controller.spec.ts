import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoreModule } from '../../core/core.module';
import { PaginatedResult } from '../../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { NotesRepository } from './notes.repository';
import { NotesController } from '../notes.controller';
import { NotesService } from '../notes.service';
import { Note } from '../note.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NotesGateway } from '../notes.gateway';
import { User } from '../../users/user.entity';

const mockGateway = {
  emitMessage() {}
};

describe('NotesController', () => {
  let notesController, notesService;
  const user = {
    ...new User(),
    id: 10,
    firstName: 'Alan',
    lastName: 'Morgan',
    email: 'gogunov00@gmail.com',
    password: 'hello'
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [NotesController],
      providers: [
        NotesService,
        { provide: getRepositoryToken(Note), useValue: new NotesRepository() },
      ],
    }).overrideProvider(NotesGateway)
      .useValue(mockGateway)
      .compile();

    notesController = module.get<NotesController>(NotesController);
    notesService = module.get<NotesService>(NotesService);
  });

  describe('findMany', () => {
    it('should return array of notes', async () => {
      const result = ['notes'];

      jest.spyOn(notesService, 'findMany').mockImplementation(() => result);

      expect(await notesController.findMany({})).toBe(result);
    });

    // it('should return paginated response if query object has been provided', async () => {
    //   const result: PaginatedResult<string> = {
    //     data: ['test'],
    //     totalCount: 1,
    //     itemsPerPage: 10,
    //     page: 1,
    //   };
    //
    //   jest.spyOn(notesService, 'findManyWithPagination').mockImplementation(() => result);
    //
    //   expect(await notesController.findMany({
    //     page: 1,
    //     limit: 5,
    //   })).toBe(result);
    // });
  });

  describe('findOne', () => {
    it('should return one note', async () => {
      const result = 'user';

      jest.spyOn(notesService, 'findOne').mockImplementation(() => result);

      expect(await notesController.findOne({})).toBe(result);
    });
  });

  describe('createOne', () => {
    const body: CreateNoteDto = {
      title: 'Alan',
      fileIds: [4],
    };

    const result = {
      ...new Note(),
      ...body,
      id: 1,
    };

    it('should return created note', async () => {

      jest.spyOn(notesService, 'createOne').mockImplementation(() => result);

      expect(await notesController.createOne(user, body)).toBe(result);
    });

  });

});