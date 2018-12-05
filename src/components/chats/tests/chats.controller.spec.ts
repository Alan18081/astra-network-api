import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginatedResult } from '../../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { ChatsRepository } from './chats.repository';
import { Chat } from '../chat.entity';
import { ChatsService } from '../chats.service';
import { ChatsController } from '../chats.controller';
import { CreateChatDto } from '../dto/http/create-chat.dto';
import { FindChatsListDto } from '../dto/http/find-chats-list.dto';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';

const mockUser = {
  ...new User(),
  firstName: 'Alan',
  lastName: 'Morgan',
  googleId: 12,
  email: 'test@gmail.com',
};

describe('ChatsController', () => {
  let chatsController, chatsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [ChatsController],
      providers: [ChatsService, { provide: getRepositoryToken(Chat), useValue: new ChatsRepository() }],
    }).overrideProvider(UsersService)
      .useValue({})
      .compile();

    chatsController = module.get<ChatsController>(ChatsController);
    chatsService = module.get<ChatsService>(ChatsService);
  });

  describe('findMany', () => {
    it('should return array of chats', async () => {
      const result = ['chats'];

      jest.spyOn(chatsService, 'findMany').mockImplementation(() => result);

      expect(await chatsController.findMany({})).toBe(result);
    });

    it('should return paginated response if query object has been provided', async () => {
      const query: PaginationDto = {
        page: 1,
        limit: 5,
      };

      const result: PaginatedResult<string> = {
        data: ['test'],
        totalCount: 1,
        itemsPerPage: 10,
        page: 1,
      };

      jest.spyOn(chatsService, 'findManyWithPagination').mockImplementation(() => result);

      expect(await chatsController.findMany(query)).toBe(result);
    });

    it('should call chatsService.findManyByIds if array of ids is provided', async () => {
      const query: FindChatsListDto = {
        ids: [4, 5],
        userId: 5
      };

      const result = ['chats'];

      const spy = jest.spyOn(chatsService, 'findManyByIds');
      spy.mockImplementation(() => result);

      expect(await chatsController.findMany(query)).toBe(result);
      expect(spy).toBeCalled();
    });

  });

  describe('findOne', () => {
    it('should return one chat', async () => {
      const result = 'chat';

      jest.spyOn(chatsService, 'findOne').mockImplementation(() => result);

      expect(await chatsController.findOne({})).toBe(result);
    });
  });

  describe('createOne', () => {
    let body: CreateChatDto;
    let chat;

    beforeEach(() => {
       body = {
        name: 'Group',
        userIds: [4, 5]
      };
      chat = {
        ...new Chat(),
        ...body,
        id: 1,
      };
    });

    it('should return created chat', async () => {

      jest.spyOn(chatsService, 'createOne').mockImplementation(() => chat);

      expect(await chatsController.createOne(mockUser, body)).toBe(chat);
    });

    it('should add author id to list of ids', async () => {
      const userIdsLength = body.userIds.length;
      jest.spyOn(chatsService, 'createOne').mockImplementation(() => chat);

      await chatsController.createOne(mockUser, body);
      expect(body.userIds.length).toBe(userIdsLength + 1);
      expect(body.userIds[body.userIds.length - 1]).toBe(mockUser.id);
    });

  });

});