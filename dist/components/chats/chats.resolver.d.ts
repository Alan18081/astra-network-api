import { ChatsService } from './chats.service';
import { User } from '../users/user.interface';
import { Chat } from './chat.interface';
import { FindChatsListDto } from './dto/find-chats-list.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PublisherService } from '../core/services/publisher.service';
import { AddUserToChatDto } from './dto/add-user-to-chat.dto';
import { RemoveUserFromChatDto } from './dto/remove-user-from-chat.dto';
import { UsersService } from '../users/users.service';
export declare class ChatsResolver {
    private readonly chatsService;
    private readonly publisherService;
    private readonly usersService;
    constructor(chatsService: ChatsService, publisherService: PublisherService, usersService: UsersService);
    admin(chat: Chat): Promise<User | null>;
    users(chat: Chat): Promise<User[]>;
    findManyChatsByUser(dto: FindChatsListDto): Promise<Chat[]>;
    findChatById(id: string): Promise<Chat | null>;
    createChat(user: User, chatDto: CreateChatDto): Promise<Chat>;
    updateChat(id: string, chatDto: UpdateChatDto): Promise<Chat | null>;
    deleteChat(id: string): Promise<boolean>;
    addUserToChat(user: User, dto: AddUserToChatDto): Promise<Chat | null>;
    removeUserFromChat(user: User, dto: RemoveUserFromChatDto): Promise<Chat | null>;
    attendChat(user: User, chatId: string): Promise<Chat | null>;
    leaveChat(user: User, chatId: string): Promise<boolean>;
    onUserAddedToChat(id: string): import("graphql-subscriptions").ResolverFn;
    onUserRemovedFromChat(id: string): import("graphql-subscriptions").ResolverFn;
}
