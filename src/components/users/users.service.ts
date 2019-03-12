import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {HashService} from '../core/services/hash.service';
import {FindUsersListDto} from './dto/find-users-list.dto';
import {Messages} from '../../helpers/enums/messages.enum';
import {GoogleUserData} from './interfaces/google-user-data.interface';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../core/dto/pagination.dto';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async findMany(payload: FindUsersListDto): Promise<User[]> {
    return this.usersRepository.findMany({});
  }

  async findUserFriends(userId: string): Promise<User[]> {
    return this.usersRepository.findUserFriends(userId);
  }

  async findManyWithPagination(query: FindUsersListDto & Required<PaginationDto>): Promise<PaginatedResult<User>> {
    return this.usersRepository.findManyWithPagination(query, { page: query.page, limit: query.limit });
  }

  async findOne(id: string): Promise<User> {
    const user =  await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneByEmail(email);
  }

  async findOneByGoogleId(id: string): Promise<User | null> {
    return this.usersRepository.findOneByGoogleId(id);
  }

  async createOne(payload: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneByEmail(payload.email);
    if(user) {
      throw new BadRequestException(Messages.USER_ALREADY_EXISTS);
    }

    const passwordHash = await this.hashService.generateHash(payload.password);

    const newUser = {
      ...payload,
      password: passwordHash,
      createdAt: new Date()
    };

    return await this.usersRepository.save(newUser);
  }

  async createByGoogle(payload: GoogleUserData): Promise<User> {
    const newUser = {
      ...payload,
    };

    return await this.usersRepository.save(newUser);
  }

  async updateById(id: string, payload: Partial<User>): Promise<User | null> {
    await this.usersRepository.updateById(id, payload);

    return await this.usersRepository.findById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }

  async setNewPassword(id: string, password: string): Promise<void> {
    const passwordHash = await this.hashService.generateHash(password);

    await this.updateById(id, { password: passwordHash });
  }

  async addFriend(userId: string, friendId: number): Promise<User | undefined> {

   return await this.findOne(userId);
  }

  async removeFriend(userId: string, friendId: number): Promise<User | undefined> {

    return await this.findOne(userId);
  }

  async isFriend(userId: number, friendId: number): Promise<boolean> {


    // return !!friend;
    return false;
  }
}