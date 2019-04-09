import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { FindChatsListDto } from './dto/find-chats-list.dto';
import { UsersService } from '../users/users.service';
import { ChatsRepository } from './chats.repository';
import { Chat } from './chat.interface';
import { AddUserToChatDto } from './dto/add-user-to-chat.dto';
import { RemoveUserFromChatDto } from './dto/remove-user-from-chat.dto';
import { Message } from '../messages/message.interface';
import { User } from '../users/user.interface';
export declare class ChatsService {
    private readonly chatsRepository;
    private readonly usersService;
    constructor(chatsRepository: ChatsRepository, usersService: UsersService);
    findMany(query: FindChatsListDto): Promise<Chat[]>;
    setLastMessage(chatId: string, messageId: string): Promise<void>;
    addUserToChat(adderId: string, { chatId, userId }: AddUserToChatDto): Promise<{
        chat: Chat | null;
        user: User;
    }>;
    removeUserFromChat(adminId: string, { chatId, userId }: RemoveUserFromChatDto): Promise<{
        chat: Chat | null;
        user: User;
    }>;
    leaveChat(chatId: string, userId: string): Promise<Chat | null>;
    findOne(id: string): Promise<Chat | null>;
    createOne(userId: string, { name, userIds }: CreateChatDto): Promise<Chat>;
    updateById(id: string, payload: UpdateChatDto): Promise<Chat | null>;
    deleteById(id: string): Promise<void>;
    findOneByIdAndUserId(chatId: string, userId: string): Promise<Chat | null>;
    filterMessages(message: Message, chatId: string, userId: string): Promise<boolean>;
}
