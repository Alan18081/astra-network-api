import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoreModule } from '../../core/core.module';
import { PaginatedResult } from '../../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { HashService } from '../../core/services/hash.service';
import { mockRepository } from '../../../helpers/test-helpers/mock-repository';

// describe('UsersService', () => {
//   let usersService, hashService;
//   const mockUsers = [new User(), new User()];
//
//
//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       imports: [CoreModule],
//       providers: [UsersService, { provide: getRepositoryToken(User), useValue: mockRepository }]
//     }).compile();
//
//     usersService = module.get<UsersService>(UsersService);
//     hashService = module.get<HashService>(HashService);
//   });
//
//   describe('findMany', () => {
//
//     it('should return an array', async () => {
//       jest.spyOn(usersService, 'prepareBuilder').mockImplementation(() =>  ({
//         async getMany() {
//           return mockUsers;
//         }
//       }));
//       expect(await usersService.findMany({  })).toBe(mockUsers);
//     });
//
//   });
//
//   describe('findManyWithPagination', () => {
//     const query: PaginationDto = {
//       page: 1,
//       limit: 2
//     };
//     const paginatedResult: PaginatedResult<User> = {
//       itemsPerPage: query.limit,
//       totalCount: 5,
//       page: query.page,
//       data: mockUsers,
//     };
//     it('should return paginated result', async () => {
//       jest.spyOn(usersService, 'prepareBuilder').mockImplementation(() =>  ({
//         skip() {
//           return this;
//         },
//         async getCount() {
//           return 5;
//         },
//         take() {
//           return this;
//         },
//         async getMany() {
//           return mockUsers;
//         }
//       }));
//
//       const result = await usersService.findManyWithPagination(query);
//
//       expect(result).toEqual(paginatedResult);
//     });
//
//   });
//
//   describe('findOne', () => {
//     it('should return user', async () => {
//       const result = new User();
//       jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);
//
//       expect(await usersService.findOne(5)).toEqual(result);
//     });
//   });
//
//   describe('findOneByEmail', () => {
//     it('should return user', async () => {
//       const result = new User();
//       jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);
//
//       expect(await usersService.findOne('markus@gmail.com')).toEqual(result);
//     });
//   });
//
//   describe('createOne', () => {
//     it('should create new user and return it', async () => {
//       const payload: CreateUserDto = {
//         firstName: 'Alan',
//         lastName: 'Morgan',
//         email: 'gogunov00@gmail.com',
//         password: 'hello'
//       };
//
//       const result = {
//         ...new User(),
//         ...payload,
//         password: hashService.generateHash('hello')
//       };
//
//       jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);
//
//       expect(await usersService.createOne(payload)).toEqual(result);
//     });
//   });
//
//   describe('createByGoogle', () => {
//     it('should create new user and return it', async () => {
//       const payload: GoogleUserData = {
//         firstName: 'Alan',
//         lastName: 'Morgan',
//         email: 'gogunov00@gmail.com',
//         googleId: '54545454'
//       };
//
//       const result = {
//         ...new User(),
//         ...payload,
//       };
//
//       jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);
//
//       expect(await usersService.createByGoogle(payload)).toEqual(result);
//     });
//   });
//
//   describe('updateOne', () => {
//     it('should update user and returns it', async () => {
//       const payload = {
//         firstName: 'Alan',
//         lastName: 'Morgan',
//       };
//
//       const result = {
//         ...new User(),
//         id: 5,
//         firstName: 'Alan',
//         lastName: 'Morgan',
//         email: 'gogunov00@gmail.com',
//         googleId: '54545454',
//         emailVerified: false,
//         phoneVerified: false,
//         online: true,
//         createdAt: new Date()
//       };
//
//       jest.spyOn(mockRepository, 'update').mockImplementation(async () => result);
//       jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);
//
//       expect(await usersService.updateOne(result.id, payload)).toEqual(result);
//     });
//   });
//
//   describe('setNewPassword', () => {
//     it('should not throw', async () => {
//       try {
//         await usersService.updateOne('hash', 'password');
//         expect(true);
//       } catch (e) {
//         expect(false);
//       }
//     });
//   });
//
// });