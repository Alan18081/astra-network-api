import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FindOneMessageDto } from './dto/find-one-message.dto';
export declare class MessagesService {
    private readonly messagesRepository;
    constructor(messagesRepository: Repository<Message>);
    private getRelations;
    findOne(id: number, query: FindOneMessageDto): Promise<Message | undefined>;
    createOne(userId: number, chatId: number, text: string): Promise<Message | undefined>;
    updateOne(payload: UpdateMessageDto): Promise<Message | undefined>;
    deleteOne(id: number): Promise<void>;
}
