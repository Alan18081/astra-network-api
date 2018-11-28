import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/http/create-chat.dto';
import { UpdateChatDto } from './dto/http/update-chat.dto';
import { PaginatedResult } from '../users/interfaces/paginated-result.interface';
import { FindOneChatDto } from './dto/http/find-one-chat.dto';
import { FindChatsListDto } from './dto/http/find-chats-list.dto';
import { UsersService } from '../users/services/users.service';
export declare class ChatsService {
    private readonly chatsRepository;
    private readonly usersService;
    constructor(chatsRepository: Repository<Chat>, usersService: UsersService);
    findMany(query: FindChatsListDto): Promise<Chat[]>;
    findManyByIds(query: FindChatsListDto): Promise<Chat[]>;
    addNewUser(chatId: number, userId: number): Promise<Chat>;
    private getRelations;
    findManyWithPagination(query: FindChatsListDto): Promise<PaginatedResult<Chat>>;
    findOne(id: number, query: FindOneChatDto): Promise<Chat | undefined>;
    createOne(payload: CreateChatDto): Promise<Chat | undefined>;
    updateOne(id: number, payload: UpdateChatDto): Promise<Chat | undefined>;
    deleteOne(id: number, userId: number): Promise<void>;
}
