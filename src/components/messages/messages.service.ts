import { ForbiddenException, Injectable } from '@nestjs/common';
import {UpdateMessageDto} from './dto/update-message.dto';
import { FindOneMessageDto } from './dto/find-one-message.dto';
import { MessagesRepository } from './messages.repository';
import { Message } from './message.interface';
import { AddMessageDto } from './dto/add-message.dto';
import { MessageInfo } from './interfaces/message-info.interface';
import { Messages } from '../../helpers/enums/messages.enum';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository
  ) {}

  async isMessageOwner(id: string, userId: string): Promise<Message> {
    const message = await this.messagesRepository.findByIdAndUserId(id, userId);
    if(!message) {
      throw new ForbiddenException(Messages.MESSAGE_NOT_FOUND_OR_WRONG_PERMISSIONS);
    }

    return message;
  }

  async findManyByChatId(chatId: string, skip: number, limit: number): Promise<Message[]> {
    return this.messagesRepository.findManyByChatId(chatId, skip, limit);
  }

  async findManyByIds(ids: string[], skip: number = 0, limit: number = 10): Promise<Message[]> {
    return this.messagesRepository.findManyByIds(ids, skip, limit);
  }

  async findById(id: string): Promise<Message | null> {
    return this.messagesRepository.findById(id);
  }

  async createOne(userId: string, { text, chatId }: AddMessageDto): Promise<Message> {
    const newMessage: Partial<Message> = {
      text,
      user: userId,
      chat: chatId,
      createdAt: new Date(),
    };
    return this.messagesRepository.save(newMessage);
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

}