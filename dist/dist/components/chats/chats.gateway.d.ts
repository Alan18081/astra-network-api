import { OnGatewayConnection, WsResponse } from '@nestjs/websockets';
import { AddMessageDto } from './dto/http/add-message.dto';
import { MessagesService } from '../messages/messages.service';
import { ChatsService } from './chats.service';
import { AddNewUserDto } from './dto/sockets/add-new-user.dto';
import { AuthService } from '../auth/auth.service';
export declare class ChatsGateway implements OnGatewayConnection {
    private readonly chatsService;
    private readonly messagesService;
    private readonly authService;
    server: any;
    constructor(chatsService: ChatsService, messagesService: MessagesService, authService: AuthService);
    handleConnection(client: any): Promise<void>;
    onAttendUser(client: any, { chatId, userId }: AddNewUserDto): void;
    onAddMessage(client: any, payload: AddMessageDto): Promise<void>;
    emitMessage(group: string | number, action: WsResponse): void;
}
