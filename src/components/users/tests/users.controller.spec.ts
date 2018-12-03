import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { CoreModule } from '../../core/core.module';
import { Repository } from 'typeorm';
import { UsersModule } from '../users.module';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { PaginationDto } from '../../core/dto/pagination.dto';

class UsersRepository extends Repository<User> {}

describe('UsersController', () => {
  let usersController, usersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [UsersController, UsersModule],
      providers: [UsersService, { provide: getRepositoryToken(User), useValue: new UsersRepository() }]
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findMany', () => {
    it('should return array of users', async () => {
      const result = ['users'];

      jest.spyOn(usersService, 'findMany').mockImplementation(() => result);

      expect(await usersController.findMany({})).toBe(result);
    });

    it('should return paginated response if query object has been provided', async () => {
      const result: PaginatedResult<string> = {
        data: ['test'],
        totalCount: 1,
        itemsPerPage: 10,
        page: 1
      };

      jest.spyOn(usersService, 'findManyWithPagination').mockImplementation(() => result);

      expect(await usersController.findMany({
        page: 1,
        limit: 5
      })).toBe(result);
    });
  });

  describe('findMany', () => {
    it('should return array of users', async () => {
      const result = ['users'];

      jest.spyOn(usersService, 'findMany').mockImplementation(() => result);

      expect(await usersController.findMany({})).toBe(result);
    });

    it('should return paginated response if query object has been provided', async () => {
      const query: PaginationDto = {
        page: 1,
        limit: 5
      };

      const result: PaginatedResult<string> = {
        data: ['test'],
        totalCount: 1,
        itemsPerPage: 10,
        page: 1
      };

      jest.spyOn(usersService, 'findManyWithPagination').mockImplementation(() => result);

      expect(await usersController.findMany(query)).toBe(result);
    });
  });

});