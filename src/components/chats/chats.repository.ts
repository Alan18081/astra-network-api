import {BaseRepository} from '../core/base.repository';
import {Chat} from './chat.interface';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {FindChatsListDto} from './dto/http/find-chats-list.dto';
import {Relations} from './interfaces/relations.interface';
import Project = ts.server.Project;

@Injectable()
export class ChatsRepository extends BaseRepository<Chat> {

    constructor(@InjectModel('Chat') chatModel: Model<Chat>) {
        super(chatModel);
    }

    async findManyByIds(ids: string[], { includeUsers, includeMessages }: FindChatsListDto): Promise<Chat[]> {
        let cursor = super.model.find({ _id: { $in: ids } });
        if(includeUsers) {
            cursor = cursor.populate('users');
        }

        if(includeMessages) {
            cursor = cursor.populate('messages');
        }

        return cursor.exec();
    }

    async findChatById(id: string, { includeUsers, includeMessages }: Relations): Promise<Chat | null> {
        let query = super.model.findById(id);
        if(includeMessages) {
            query = query.populate('users');
        }

        if(includeMessages) {
            query = query.populate('messages');
        }

        return query.exec();
    }

    async addUserToChat(chatId: string, userId: string): Promise<Chat | null> {
        return super.model.findByIdAndUpdate(chatId, { $addToSet: { users: userId } });
    }

    async removeUserFromChat(chatId: string, userId: string): Promise<Chat | null> {
        return super.model.findByIdAndUpdate(chatId, { $pull: { users: userId } });
    }
}