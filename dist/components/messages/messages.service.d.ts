import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesRepository } from './messages.repository';
import { Message } from './message.interface';
import { AddMessageDto } from './dto/add-message.dto';
import { MessageInfo } from './interfaces/message-info.interface';
export declare class MessagesService {
    private readonly messagesRepository;
    constructor(messagesRepository: MessagesRepository);
    isMessageOwner(id: string, userId: string): Promise<Message>;
    findManyByChatId(chatId: string, skip: number, limit: number): Promise<Message[]>;
    findById(id: string): Promise<Message | null>;
    createOne(userId: string, { text, chatId }: AddMessageDto): Promise<Message>;
    updateById(id: string, payload: UpdateMessageDto, userId: string): Promise<Message | null>;
    deleteById(id: string, userId: string): Promise<MessageInfo>;
}
