import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {HashService} from '../core/services/hash.service';
import {Messages} from '../../helpers/enums/messages.enum';
import {GoogleUserData} from './interfaces/google-user-data.interface';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';
import {ChangePasswordDto} from './dto/change-password.dto';
import { FindManyUsersListDto } from './dto/find-many-users-list.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async findMany(payload: FindManyUsersListDto): Promise<User[]> {
    return this.usersRepository.findManyWithFilter(payload);
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    return this.usersRepository.findManyByIds(ids);
  }

  async findUserFriends(userId: string): Promise<User[]> {
    return this.usersRepository.findUserFriends(userId);
  }

  async findOne(id: string): Promise<User> {
    const user =  await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    return user;
  }

  async findByIdAndFriendId(id: string, friendId: string): Promise<User | null> {
    return this.usersRepository.findByIdAndFriendId(id, friendId);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneByEmail(email);
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

  async updateById(id: string, payload: Partial<User>): Promise<User | null> {
    return this.usersRepository.updateById(id, payload);
  }

  async changePassword(user: User, { oldPassword, newPassword }: ChangePasswordDto): Promise<User | null> {
    if(!(await this.hashService.compareHash(oldPassword, user.password))) {
      throw new ForbiddenException(Messages.INVALID_PASSWORD);
    }

    const newEncryptedPassword = await this.hashService.generateHash(newPassword);

    return this.usersRepository.updateById(user._id, { password: newEncryptedPassword });
  }

  async deleteById(id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }

  async setNewPassword(id: string, password: string): Promise<void> {
    const passwordHash = await this.hashService.generateHash(password);

    await this.updateById(id, { password: passwordHash });
  }

  async addFriend(userId: string, friendId: string): Promise<User | null> {
    return this.usersRepository.addFriend(userId, friendId);
  }

  async removeFriend(userId: string, friendId: string): Promise<User | null> {
    return this.usersRepository.removeFriend(userId, friendId);
  }

  async checkIsFriend(userId: string, friendId: string): Promise<boolean> {
    const user = await this.usersRepository.findUserWithFriend(userId, friendId);
    return !!user;
  }

  async setAuthyId(id: string, authyId: string): Promise<User | null> {
    return this.usersRepository.updateById(id, { authyId });
  }

  async setPhoneVerified(id: string): Promise<User | null> {
    return this.usersRepository.updateById(id, { phoneVerified: true });
  }
}