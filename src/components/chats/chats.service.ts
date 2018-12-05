import { Injectable } from '@nestjs/common';
import { uniqBy } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptions, FindOptionsRelation, Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/http/create-chat.dto';
import { UpdateChatDto } from './dto/http/update-chat.dto';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { User } from '../users/user.entity';
import { FindOneChatDto } from './dto/http/find-one-chat.dto';
import { FindChatsListDto } from './dto/http/find-chats-list.dto';
import {WsException} from '@nestjs/websockets';
import {Messages} from '../../helpers/enums/messages.enum';
import {UsersService} from '../users/users.service';
import { PaginationDto } from '../core/dto/pagination.dto';

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

  async findManyByIds(ids: number[], query: FindChatsListDto ): Promise<Chat[]> {
    const relations = this.getRelations(query);
    return await this.chatsRepository.findByIds(ids, { relations });
  }

  async addNewUserToChat(chatId: number, userId: number): Promise<Chat> {

    const [chat, user] = await Promise.all([
      this.findOne(chatId, { includeUsers: true }),
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

  async removeUserFromChat(chatId: number, userId: number): Promise<Chat> {
    const [chat, user] = await Promise.all([
      this.findOne(chatId, { includeUsers: true }),
      this.usersService.findOne(userId),
    ]);

    if (!user) {
      throw new WsException(Messages.USER_NOT_FOUND);
    }

    if (!chat) {
      throw new WsException(Messages.CHAT_NOT_FOUND);
    }

    chat.users = chat.users.filter(({ id }: User) => id !== userId);

    return await this.chatsRepository.save(chat);
  }

  private getRelations(query: FindChatsListDto | FindOneChatDto): FindOptionsRelation<Chat> {
    const relations: FindOptionsRelation<Chat> = [];

    if (query.includeMessages) {
      relations.push('messages');
    }

    if (query.includeUsers) {
      relations.push('users');
    }

    return relations;
  }

  async findManyWithPagination(query: FindChatsListDto & Required<PaginationDto>): Promise<PaginatedResult<Chat>> {
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
    const relations: FindOptionsRelation<Chat> = this.getRelations(query);

    return await this.chatsRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  async createOne(payload: CreateChatDto): Promise<Chat | undefined> {
    const chat = new Chat();

    chat.name = payload.name;
    chat.createdAt = new Date();
    chat.users = uniqBy(
      payload.userIds.map(id => ({ id })) as User[],
      ({ id }) => id,
    );

    await this.chatsRepository.save(chat);
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