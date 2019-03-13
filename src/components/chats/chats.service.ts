import { Injectable } from '@nestjs/common';
import { uniqBy } from 'lodash';
import { CreateChatDto } from './dto/http/create-chat.dto';
import { UpdateChatDto } from './dto/http/update-chat.dto';
import { FindOneChatDto } from './dto/http/find-one-chat.dto';
import { FindChatsListDto } from './dto/http/find-chats-list.dto';
import {WsException} from '@nestjs/websockets';
import {Messages} from '../../helpers/enums/messages.enum';
import {UsersService} from '../users/users.service';
import {ChatsRepository} from './chats.repository';
import {Chat} from './chat.interface';

@Injectable()
export class ChatsService {

  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly usersService: UsersService,
  ) {}

  async findMany(query: FindChatsListDto): Promise<Chat[]> {
    if(query.ids) {
      return this.chatsRepository.findManyByIds(query.ids, { ...query });
    }
    return this.chatsRepository.findMany({ });
  }

  async addNewUserToChat(chatId: string, userId: string): Promise<Chat | null> {

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

    return this.chatsRepository.addUserToChat(chat._id, user._id);
  }

  async removeUserFromChat(chatId: string, userId: string): Promise<Chat | null> {
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

    return this.chatsRepository.removeUserFromChat(chat._id, user._id);
  }

  async findOne(id: string, query: FindOneChatDto): Promise<Chat | null> {
    return this.chatsRepository.findChatById(id, { includeUsers: query.includeMessages, includeMessages: query.includeUsers });
  }

  async createOne({ name, userIds }: CreateChatDto): Promise<Chat> {
    const chat: Partial<Chat> = {
        name,
        createdAt: new Date(),
        users: uniqBy(userIds, id => id),
    };

    return this.chatsRepository.save(chat);
  }

  async updateById(id: string, payload: UpdateChatDto): Promise<Chat | null> {
    return this.chatsRepository.updateById(id, payload);
  }

  async deleteById(id: string): Promise<void> {
    await this.chatsRepository.deleteById(id);
  }
}