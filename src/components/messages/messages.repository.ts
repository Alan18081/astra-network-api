import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../core/base.repository';
import { Message } from './message.interface';
import { Model } from 'mongoose';

@Injectable()
export class MessagesRepository extends BaseRepository<Message> {

  constructor(@InjectModel('Message') messagesModel: Model<Message>) {
    super(messagesModel);
  }

  async findManyByChatId(chatId: string, skip: number, limit: number): Promise<Message[]> {
    return this.model.find({ chat: chatId }).sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
  }

  async updateById(id: string, payload: Partial<Message>): Promise<Message | null> {
    return this.model.findByIdAndUpdate(id, payload, { new: true });
  }

  async findById(id: string): Promise<Message | null> {
    return this.model.findById(id);
  }

  async findByIdAndUserId(id: string, userId: string): Promise<Message | null> {
    return this.model.findOne({ _id: id, user: userId });
  }

}