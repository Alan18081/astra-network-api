import { ChatsService } from './chats.service';
import { User } from '../users/user.entity';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/http/create-chat.dto';
import { FindChatsListDto } from './dto/http/find-chats-list.dto';
import { UpdateChatDto } from './dto/http/update-chat.dto';
import { FindOneChatDto } from './dto/http/find-one-chat.dto';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    findMany(query: FindChatsListDto): Promise<Chat[] | PaginatedResult<Chat>>;
    findOne(id: number, query: FindOneChatDto): Promise<Chat | undefined>;
    createOne(user: User, payload: CreateChatDto): Promise<Chat | undefined>;
    updateOne(id: number, payload: UpdateChatDto): Promise<Chat | undefined>;
    deleteOne(user: User, id: number): Promise<void>;
}
