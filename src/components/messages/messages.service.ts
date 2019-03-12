import {Injectable} from '@nestjs/common';
import {UpdateMessageDto} from './dto/update-message.dto';
import { FindOneMessageDto } from './dto/find-one-message.dto';
import { MessagesRepository } from './messages.repository';
import { Message } from './message.interface';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
  ) {}

  async findById(id: string, query: FindOneMessageDto): Promise<Message | null> {
    if(query.includeUser) {
      return this.messagesRepository.findByIdWithMessages(id);
    }
    return this.messagesRepository.findById(id);
  }

  async createOne(userId: string, chatId: string, text: string): Promise<Message | undefined> {
    const newMessage: Partial<Message> = {
      text,
      user: userId,
      chat: chatId,
      createdAt: new Date(),
    };
    return this.messagesRepository.save(newMessage);
  }

  async updateById(payload: UpdateMessageDto): Promise<Message | null> {
    return this.messagesRepository.updateById(payload.messageId, payload);
  }

  async deleteById(id: string): Promise<void> {
    await this.messagesRepository.deleteById(id);
  }

}