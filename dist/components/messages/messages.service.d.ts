import { UpdateMessageDto } from './dto/update-message.dto';
import { FindOneMessageDto } from './dto/find-one-message.dto';
import { MessagesRepository } from './messages.repository';
import { Message } from './message.interface';
import { AddMessageDto } from './dto/add-message.dto';
import { MessageInfo } from './interfaces/message-info.interface';
import { ChatsService } from '../chats/chats.service';
export declare class MessagesService {
    private readonly messagesRepository;
    private readonly chatsService;
    constructor(messagesRepository: MessagesRepository, chatsService: ChatsService);
    isMessageOwner(id: string, userId: string): Promise<Message>;
    findById(id: string, query: FindOneMessageDto): Promise<Message | null>;
    createOne(userId: string, { text, chatId }: AddMessageDto): Promise<Message | null>;
    updateById(id: string, payload: UpdateMessageDto, userId: string): Promise<Message | null>;
    deleteById(id: string, userId: string): Promise<MessageInfo>;
    filterMessages(message: Message, chatId: string, userId: string): Promise<boolean>;
}
