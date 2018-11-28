import { FindOptions, Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PaginatedResult } from '../users/interfaces/paginated-result.interface';
import { FindOneChatDto } from './dto/find-one-chat.dto';
import { FindChatsListDto } from './dto/find-chats-list.dto';
export declare class ChatsService {
    private readonly chatsRepository;
    constructor(chatsRepository: Repository<Chat>);
    findMany(query: FindChatsListDto): Promise<Chat[]>;
    findManyByIds(query: FindChatsListDto): Promise<Chat[]>;
    buildQuery(query: FindChatsListDto): FindOptions<Chat>;
    findManyWithPagination(query: FindChatsListDto): Promise<PaginatedResult<Chat>>;
    findOne(id: number, query: FindOneChatDto): Promise<Chat | undefined>;
    createOne(payload: CreateChatDto): Promise<Chat | undefined>;
    updateOne(id: number, payload: UpdateChatDto): Promise<Chat | undefined>;
}
