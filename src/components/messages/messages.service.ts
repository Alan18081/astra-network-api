import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import {UpdateMessageDto} from './dto/update-message.dto';
import { FindOneMessageDto } from './dto/find-one-message.dto';
import { MessagesRepository } from './messages.repository';
import { Message } from './message.interface';
import { AddMessageDto } from './dto/add-message.dto';
import { MessageInfo } from './interfaces/message-info.interface';
import { Messages } from '../../helpers/enums/messages.enum';
import { User } from '../users/user.interface';
import { isUser } from '../../helpers/helpers';
import { useAsPath } from 'tslint/lib/configuration';
import {ChatsService} from '../chats/chats.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly chatsService: ChatsService
  ) {}

  async isMessageOwner(id: string, userId: string): Promise<Message> {
    const message = await this.messagesRepository.findByIdAndUserId(id, userId);
    if(!message) {
      throw new ForbiddenException(Messages.MESSAGE_NOT_FOUND_OR_WRONG_PERMISSIONS);
    }

    return message;
  }

  async findById(id: string, query: FindOneMessageDto): Promise<Message | null> {
    if(query.includeUser) {
      return this.messagesRepository.findByIdWithMessages(id);
    }
    return this.messagesRepository.findById(id);
  }

  async createOne(userId: string, { text, chatId }: AddMessageDto): Promise<Message | null> {
    const newMessage: Partial<Message> = {
      text,
      user: userId,
      chat: chatId,
      createdAt: new Date(),
    };
    const { _id } = await this.messagesRepository.save(newMessage);
    return this.messagesRepository.findById(_id);
  }

  async updateById(id: string, payload: UpdateMessageDto, userId: string): Promise<Message | null> {
    await this.isMessageOwner(id, userId);
    return this.messagesRepository.updateById(id, payload);
  }

  async deleteById(id: string, userId: string): Promise<MessageInfo> {
    const message = await this.isMessageOwner(id, userId);
    await this.messagesRepository.deleteById(id);

    return {
      _id: message._id,
      chatId: message.chat as string,
    }
  }

  async filterMessages(message: Message, chatId: string, userId: string): Promise<boolean> {
    if(message.chat !== chatId) {
      return false;
    }

    const chat = await this.chatsService.findOneByIdAndUserId(chatId, userId);
    return !!chat;
  }

}