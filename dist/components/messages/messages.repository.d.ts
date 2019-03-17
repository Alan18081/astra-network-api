import { BaseRepository } from '../core/base.repository';
import { Message } from './message.interface';
import { Model } from 'mongoose';
export declare class MessagesRepository extends BaseRepository<Message> {
    constructor(messagesModel: Model<Message>);
    findByIdWithMessages(id: string): Promise<Message | null>;
    updateById(id: string, payload: Partial<Message>): Promise<Message | null>;
    findById(id: string): Promise<Message | null>;
    findByIdAndUserId(id: string, userId: string): Promise<Message | null>;
}
