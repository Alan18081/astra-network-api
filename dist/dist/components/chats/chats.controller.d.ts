import { ChatsService } from './chats.service';
import { User } from '../users/user.entity';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindChatsListDto } from './dto/find-chats-list.dto';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    findAll(query: FindChatsListDto): Promise<Chat[]>;
    createOne(user: User, payload: CreateChatDto): Promise<Chat | undefined>;
}
