import { ChatsService } from './chats.service';
import { User } from '../users/user.entity';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/http/create-chat.dto';
import { FindChatsListDto } from './dto/http/find-chats-list.dto';
import { UpdateChatDto } from './dto/http/update-chat.dto';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    findAll(query: FindChatsListDto): Promise<Chat[]>;
    createOne(user: User, payload: CreateChatDto): Promise<Chat | undefined>;
    updateOne(id: number, payload: UpdateChatDto): Promise<Chat | undefined>;
    deleteOne(user: User, id: number): Promise<void>;
}
