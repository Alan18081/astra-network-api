import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { AddMessageDto } from './dto/add-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessagesService {
    private readonly messagesRepository;
    constructor(messagesRepository: Repository<Message>);
    addMessage(payload: AddMessageDto): Promise<Message>;
    updateMessage(payload: UpdateMessageDto): Promise<Message | undefined>;
    removeMessage(id: number): Promise<void>;
}
