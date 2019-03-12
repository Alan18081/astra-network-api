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

  async findByIdWithMessages(id: string): Promise<Message | null> {
    return super.model.findById(id).populate('user');
  }

  async updateById(id: string, payload: Partial<Message>): Promise<Message | null> {
    return super.model.findByIdAndUpdate(id, payload).populate('user');
  }

}