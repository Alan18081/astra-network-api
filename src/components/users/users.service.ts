import {Injectable, NotFoundException} from '@nestjs/common';
import {BaseService} from '../../helpers/interfaces/base-service.interface';
import {User} from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {HashService} from '../core/services/hash.service';
import {FindUsersListDto} from './dto/find-users-list.dto';
import {Roles} from '../../helpers/enums/roles.enum';
import {Messages} from '../../helpers/enums/messages.enum';
import {GoogleUserData} from './interfaces/google-user-data.interface';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../core/dto/pagination.dto';

@Injectable()
export class UsersService implements BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async findMany(payload: FindUsersListDto): Promise<User[]> {
    const queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), payload);
    return await queryBuilder.getMany();
  }

  prepareBuilder(queryBuilder: SelectQueryBuilder<User>, query: FindUsersListDto): SelectQueryBuilder<User> {
    if (query.ageFrom) {
      queryBuilder.where('age > :ageFrom', { ageFrom: query.ageFrom});
    }

    if (query.ageTo) {
      queryBuilder.where('age < :ageTo', { ageTo: query.ageTo });
    }

    return queryBuilder;
  }

  async findManyWithPagination(query: FindUsersListDto & Required<PaginationDto>): Promise<PaginatedResult<User>> {
    const skip = (query.page - 1) * query.limit;
    const queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), query);
    const totalCount = await queryBuilder.getCount();
    const data = await queryBuilder.skip(skip).take(query.limit).getMany();

    return {
      page: query.page,
      itemsPerPage: query.limit,
      totalCount,
      data,
    };
  }

  async findOne(id: number): Promise<User | undefined> {
    const user =  await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      email
    });
  }

  async findOneByGoogleId(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ googleId: id });
  }

  async createOne(payload: CreateUserDto): Promise<User> {
    const passwordHash = await this.hashService.generateHash(payload.password);

    const newUser = {
      ...new User(),
      ...payload,
      password: passwordHash,
    };

    return await this.usersRepository.save(newUser);
  }

  async createByGoogle(payload: GoogleUserData): Promise<User> {
    const newUser = {
      ...new User(),
      ...payload,
    };

    return await this.usersRepository.save(newUser);
  }

  async updateOne(id: number, payload: Partial<User>): Promise<User | undefined> {
    await this.usersRepository.update(
      { id },
      payload,
    );

    return await this.usersRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }

  async setNewPassword(id: number, password: string): Promise<void> {
    const passwordHash = await this.hashService.generateHash(password);

    await this.updateOne(id, { password: passwordHash });
  }

  async addFriend(userId: number, friendId: number): Promise<User | undefined> {
   await this.usersRepository
     .createQueryBuilder()
     .relation(User, 'friends')
     .of(userId)
     .add(friendId);

   return await this.findOne(userId);
  }

  async removeFriend(userId: number, friendId: number): Promise<User | undefined> {
    await this.usersRepository
      .createQueryBuilder()
      .relation(User, 'friends')
      .of(userId)
      .remove(friendId);

    return await this.findOne(userId);
  }

  async isFriend(userId: number, friendId: number): Promise<boolean> {
    const friend = await this.usersRepository.findOne({
      where: {
        id: friendId,
        friends: {
          id: friendId
        }
      }
    });

    console.log('Some friend', friend);

    return !!friend;
  }
}