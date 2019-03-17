import {BaseRepository} from '../core/base.repository';
import {Chat} from './chat.interface';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {FindChatsListDto} from './dto/find-chats-list.dto';
import {Relations} from './interfaces/relations.interface';

@Injectable()
export class ChatsRepository extends BaseRepository<Chat> {

    constructor(@InjectModel('Chat') chatModel: Model<Chat>) {
        super(chatModel);
    }

    async findManyByIds(ids: string[]): Promise<Chat[]> {
        return this.model.find({ _id: { $in: ids } }).exec();
    }

    async findChatById(id: string): Promise<Chat | null> {
        return this.model.findById(id);
    }

    async addUserToChat(chatId: string, userId: string): Promise<Chat | null> {
        return this.model.findByIdAndUpdate(chatId, { $addToSet: { users: userId } }, { new: true });
    }

    async removeUserFromChat(chatId: string, userId: string): Promise<Chat | null> {
        return this.model.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true });
    }

    async findOneByIdAndUserId(chatId: string, userId: string): Promise<Chat | null> {
        return this.model.findOne({ _id: chatId, users:  userId });
    }

    async findOneByIdAndAdminId(chatId: string, adminId: string): Promise<Chat | null> {
        return this.model.findOne({ _id: chatId, admin: adminId });
    }
}