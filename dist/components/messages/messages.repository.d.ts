import { BaseRepository } from '../core/base.repository';
import { Message } from './message.interface';
import { Model } from 'mongoose';
export declare class MessagesRepository extends BaseRepository<Message> {
    constructor(messagesModel: Model<Message>);
    findManyByChatId(chatId: string, skip: number, limit: number): Promise<Message[]>;
    findManyByIds(ids: string[], skip: number, limit: number): Promise<Message[]>;
    updateById(id: string, payload: Partial<Message>): Promise<Message | null>;
    findById(id: string): Promise<Message | null>;
    findByIdAndUserId(id: string, userId: string): Promise<Message | null>;
}
