import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Message} from './message.entity';
import { FindOptionsRelation, Repository } from 'typeorm';
import {User} from '../users/user.entity';
import {UpdateMessageDto} from './dto/update-message.dto';
import { FindOneMessageDto } from './dto/find-one-message.dto';
import { Chat } from '../chats/chat.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  private getRelations(query: FindOneMessageDto): FindOptionsRelation<Message> {
    const relations: FindOptionsRelation<Message> = [];

    if (query.includeUser) {
      relations.push('user');
    }

    return relations;
  }


  async findOne(id: number, query: FindOneMessageDto): Promise<Message | undefined> {
    const relations: FindOptionsRelation<Message> = this.getRelations(query);

    return await this.messagesRepository.findOne({
      where: {
        id
      },
      relations
    });
  }

  async createOne(userId: number, chatId: number, text: string): Promise<Message | undefined> {
    const newMessage = {
      ...new Message(),
      text,
      user: { id: userId } as User,
      userId,
      chat: { id: chatId } as Chat,
      createdAt: new Date().toISOString()
    };
    await this.messagesRepository.save(newMessage);

    return await this.findOne(newMessage.id, { includeUser: true });
  }

  async updateOne(payload: UpdateMessageDto): Promise<Message | undefined> {
    await this.messagesRepository.update(
      {
        id: payload.messageId,
      },
      {
        text: payload.text,
      },
    );

    return await this.findOne(payload.messageId, { includeUser: true });
  }

  async deleteOne(id: number): Promise<void> {
    await this.messagesRepository.delete({id});
  }

}