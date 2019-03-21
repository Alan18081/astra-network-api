import { ChatsService } from '../../chats/chats.service';
import { User } from '../../users/user.interface';
import { Chat } from '../../chats/chat.interface';
import { FindChatsListDto } from '../../chats/dto/find-chats-list.dto';
import { CreateChatDto } from '../../chats/dto/create-chat.dto';
import { UpdateChatDto } from '../../chats/dto/update-chat.dto';
import { PublisherService } from '../../core/services/publisher.service';
import { AddUserToChatDto } from '../../chats/dto/add-user-to-chat.dto';
import { RemoveUserFromChatDto } from '../../chats/dto/remove-user-from-chat.dto';
import { UsersService } from '../../users/users.service';
import { MessagesService } from '../../messages/messages.service';
import { Message } from '../../messages/message.interface';
import { ChatUserInfoInterface } from '../../chats/interfaces/chat-user-info.interface';
export declare class ChatsResolver {
    private readonly chatsService;
    private readonly publisherService;
    private readonly usersService;
    private readonly messagesService;
    constructor(chatsService: ChatsService, publisherService: PublisherService, usersService: UsersService, messagesService: MessagesService);
    messages(chat: Chat, skip: number, limit: number): Promise<Message[]>;
    lastMessage(chat: Chat): Promise<Message | null>;
    admin(chat: Chat): Promise<User | null>;
    users(chat: Chat): Promise<User[]>;
    findManyChatsByUser(dto: FindChatsListDto): Promise<Chat[]>;
    findChatById(user: User, id: string): Promise<Chat | null>;
    createChat(user: User, chatDto: CreateChatDto): Promise<Chat>;
    updateChat(id: string, chatDto: UpdateChatDto): Promise<Chat | null>;
    deleteChat(id: string): Promise<boolean>;
    addUserToChat(reqUser: User, dto: AddUserToChatDto): Promise<Chat | null>;
    removeUserFromChat(reqUser: User, dto: RemoveUserFromChatDto): Promise<Chat | null>;
    attendChat(reqUser: User, chatId: string): Promise<Chat | null>;
    leaveChat(user: User, chatId: string): Promise<boolean>;
    onUserAddedToChat(): {
        resolve: (payload: ChatUserInfoInterface) => User;
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
    onUserRemovedFromChat(): {
        resolve: (payload: ChatUserInfoInterface) => User;
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
}
