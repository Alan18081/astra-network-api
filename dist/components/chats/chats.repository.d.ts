import { BaseRepository } from '../core/base.repository';
import { Chat } from './chat.interface';
import { Model } from 'mongoose';
export declare class ChatsRepository extends BaseRepository<Chat> {
    constructor(chatModel: Model<Chat>);
    findManyByIds(ids: string[]): Promise<Chat[]>;
    findChatById(id: string): Promise<Chat | null>;
    addUserToChat(chatId: string, userId: string): Promise<Chat | null>;
    removeUserFromChat(chatId: string, userId: string): Promise<Chat | null>;
    findOneByIdAndUserId(chatId: string, userId: string): Promise<Chat | null>;
    findOneByIdAndAdminId(chatId: string, adminId: string): Promise<Chat | null>;
}
