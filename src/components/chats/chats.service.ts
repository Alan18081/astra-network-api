import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions, FindOptionsRelation, Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/http/create-chat.dto';
import { UpdateChatDto } from './dto/http/update-chat.dto';
import { FindUsersListDto } from '../users/dto/find-users-list.dto';
import { PaginatedResult } from '../users/interfaces/paginated-result.interface';
import { User } from '../users/user.entity';
import { FindOneChatDto } from './dto/http/find-one-chat.dto';
import { FindChatsListDto } from './dto/http/find-chats-list.dto';
import {WsException} from '@nestjs/websockets';
import {Messages} from '../../helpers/enums/messages.enum';
import {UsersService} from '../users/services/users.service';

@Injectable()
export class ChatsService {

  constructor(
    @InjectRepository(Chat)
    private readonly chatsRepository: Repository<Chat>,
    private readonly usersService: UsersService,
  ) {}

  async findMany(query: FindChatsListDto): Promise<Chat[]> {
    const options: FindOptions<Chat> = {
      where: {},
      relations: [],
    };

    if (query.userId) {
      options.where = {
       users: {
         id: query.userId,
       },
      };
    }

    options.relations = this.getRelations(query);
    return await this.chatsRepository.find(options);
  }

  async findManyByIds(query: FindChatsListDto): Promise<Chat[]> {
    const relations = this.getRelations(query);
    return await this.chatsRepository.findByIds(query.ids, { relations });
  }

  async addNewUser(chatId: number, userId: number): Promise<Chat> {
    const [chat, user] = await Promise.all([
      this.chatsRepository.findOne(chatId),
      this.usersService.findOne(userId),
    ]);

    if (!user) {
      throw new WsException(Messages.USER_NOT_FOUND);
    }

    if (!chat) {
      throw new WsException(Messages.CHAT_NOT_FOUND);
    }

    const foundUser = chat.users.find(({ id }: User) => id === userId);
    if (!foundUser) {
      chat.users.push(user);
    }

    return await this.chatsRepository.save(chat);
  }

  private getRelations(query: FindChatsListDto): FindOptionsRelation<Chat> {
    const relations: FindOptionsRelation<Chat> = [];

    if (query.includeMessages) {
      relations.push('messages');
    }

    if (query.includeUsers) {
      relations.push('users');
    }

    return relations;
  }

  async findManyWithPagination(query: FindChatsListDto): Promise<PaginatedResult<Chat>> {
    const options: FindOptions<Chat> = {
      where: {},
      relations: [],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    };

    if (query.userId) {
      options.where = {
        users: {
          id: query.userId,
        },
      };
    }
    options.relations = this.getRelations(query);

    const [data, totalCount] = await this.chatsRepository.findAndCount(
        options,
      );

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

  async deleteOne(id: number, userId: number): Promise<void> {
    const chat = await this.chatsRepository.findOne(id, { relations: ['users'] });

    if (chat) {
      chat.users = chat.users.filter((user: User) => user.id !== userId);
      if (chat.users.length === 0) {
        await this.chatsRepository.delete({ id });
      } else {
        await this.chatsRepository.save(chat);
      }
    }

  }
}