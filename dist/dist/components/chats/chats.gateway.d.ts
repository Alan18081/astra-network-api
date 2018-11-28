import { OnGatewayConnection } from '@nestjs/websockets';
import { AddMessageDto } from './dto/add-message.dto';
import { MessagesService } from '../messages/messages.service';
export declare class ChatsGateway implements OnGatewayConnection {
    private readonly messagesService;
    server: any;
    constructor(messagesService: MessagesService);
    handleConnection(client: any): void;
    onAttendUser(client: any, { chatId }: {
        chatId: any;
    }): void;
    onAddMessage(client: any, payload: AddMessageDto): Promise<void>;
}
