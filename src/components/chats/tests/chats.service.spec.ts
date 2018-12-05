import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginatedResult } from '../../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { mockRepository } from '../../../helpers/test-helpers/mock-repository';
import { Chat } from '../chat.entity';
import { ChatsService } from '../chats.service';
import { UsersService } from '../../users/users.service';

const mockUsersService = {

};

describe('UsersService', () => {
  let chatsService;
  const mockUsers = [new Chat(), new Chat()];


  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [ChatsService, { provide: getRepositoryToken(Chat), useValue: mockRepository }]
    }).overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    chatsService = module.get<ChatsService>(ChatsService);
  });

  describe('findMany', () => {

    it('should return an array', async () => {
      jest.spyOn(chatsService, 'prepareBuilder').mockImplementation(() =>  ({
        async getMany() {
          return mockUsers;
        }
      }));
      expect(await chatsService.findMany({  })).toBe(mockUsers);
    });

  });

  describe('findManyWithPagination', () => {
    const query: PaginationDto = {
      page: 1,
      limit: 2
    };
    const paginatedResult: PaginatedResult<Chat> = {
      itemsPerPage: query.limit,
      totalCount: 5,
      page: query.page,
      data: mockUsers,
    };
    it('should return paginated result', async () => {
      jest.spyOn(chatsService, 'prepareBuilder').mockImplementation(() =>  ({
        skip() {
          return this;
        },
        async getCount() {
          return 5;
        },
        take() {
          return this;
        },
        async getMany() {
          return mockUsers;
        }
      }));

      const result = await chatsService.findManyWithPagination(query);

      expect(result).toEqual(paginatedResult);
    });

  });

  describe('findOne', () => {
    it('should return user', async () => {
      const result = new User();
      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);

      expect(await chatsService.findOne(5)).toEqual(result);
    });
  });

  describe('findOneByEmail', () => {
    it('should return user', async () => {
      const result = new User();
      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);

      expect(await chatsService.findOne('markus@gmail.com')).toEqual(result);
    });
  });

  describe('createOne', () => {
    it('should create new user and return it', async () => {
      const payload: CreateUserDto = {
        firstName: 'Alan',
        lastName: 'Morgan',
        email: 'gogunov00@gmail.com',
        password: 'hello'
      };

      const result = {
        ...new User(),
        ...payload,
        password: hashService.generateHash('hello')
      };

      jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);

      expect(await chatsService.createOne(payload)).toEqual(result);
    });
  });

  describe('createByGoogle', () => {
    it('should create new user and return it', async () => {
      const payload: GoogleUserData = {
        firstName: 'Alan',
        lastName: 'Morgan',
        email: 'gogunov00@gmail.com',
        googleId: '54545454'
      };

      const result = {
        ...new User(),
        ...payload,
      };

      jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);

      expect(await chatsService.createByGoogle(payload)).toEqual(result);
    });
  });

  describe('updateOne', () => {
    it('should update user and returns it', async () => {
      const payload = {
        firstName: 'Alan',
        lastName: 'Morgan',
      };

      const result = {
        ...new User(),
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

      expect(await chatsService.updateOne(result.id, payload)).toEqual(result);
    });
  });

  describe('setNewPassword', () => {
    it('should not throw', async () => {
      try {
        await chatsService.updateOne('hash', 'password');
        expect(true);
      } catch (e) {
        expect(false);
      }
    });
  });

});