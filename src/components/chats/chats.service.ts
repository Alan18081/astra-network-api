import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions, FindOptionsRelation, Repository, SelectQueryBuilder } from 'typeorm';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { FindUsersListDto } from '../users/dto/find-users-list.dto';
import { PaginatedResult } from '../users/interfaces/paginated-result.interface';
import { User } from '../users/user.entity';
import { FindOneChatDto } from './dto/find-one-chat.dto';
import { FindChatsListDto } from './dto/find-chats-list.dto';

@Injectable()
export class ChatsService {

  constructor(
    @InjectRepository(Chat)
    private readonly chatsRepository: Repository<Chat>,
  ) {}

  async findMany(query: FindChatsListDto): Promise<Chat[]> {
    const builder = this.buildQuery(query);
    return await builder.getMany();
  }

  async findManyByIds(query: FindChatsListDto): Promise<Chat[]> {
    const builder = this.buildQuery(query);
    return await builder.getMany();
  }

  // buildQuery(query: FindChatsListDto): SelectQueryBuilder<Chat> {
  //   const builder = this.chatsRepository.createQueryBuilder('chat');
  //
  //   if (query.userId) {
  //     builder.innerJoin('user', 'users', 'user.id = :userId', {id: query.userId});
  //   }
  //
  //   if (query.includeMessages) {
  //     builder.innerJoin('messages', 'message');
  //   }
  //
  //   if (query.includeUsers) {
  //     builder.innerJoin('users', 'user');
  //   }
  //
  //   return builder;
  // }
  buildQuery(query: FindChatsListDto): FindOptions<Chat> {
    // const builder = this.chatsRepository.createQueryBuilder('chat');
    // const relations =

    if (query.includeMessages) {
      options.relations.push('messages');
    }

    if (query.includeUsers) {

    }

    return {};
  }
  //
  // async findManyByIds(query: FindChatsListDto): Promise<Chat[]> {
  //
  // }

  async findManyWithPagination(query: FindChatsListDto): Promise<PaginatedResult<Chat>> {
    const skip = (query.page - 1) * query.limit;
    const queryBuilder = this.buildQuery(query);
    const totalCount = await queryBuilder.getCount();
    const data = await queryBuilder.skip(skip).take(query.limit).getMany();

    return {
      page: query.page,
      itemsPerPage: query.limit,
      totalCount,
      data,
    };
  }


  async findOne(id: number, query: FindOneChatDto): Promise<Chat | undefined> {
    const relations: FindOptionsRelation<Chat> = [];

    if (query.includeMessages) {
      relations.push('messages');
    }

    if (query.includeUsers) {
      relations.push('users');
    }

    return await this.chatsRepository.findOne({
      id,
    }, { relations });
  }

  async createOne(payload: CreateChatDto): Promise<Chat | undefined> {
    const chat = new Chat();

    chat.name = payload.name;
    chat.createdAt = new Date();
    chat.users = payload.userIds.map(id => ({ id })) as User[];
    return await this.findOne(chat.id, { includeUsers: true });
  }

  async updateOne(id: number, payload: UpdateChatDto): Promise<Chat | undefined> {
    await this.chatsRepository.update(id, payload);

    return await this.chatsRepository.findOne(id);
  }


}