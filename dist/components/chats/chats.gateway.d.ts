import { MessagesService } from '../messages/messages.service';
import { ChatsService } from './chats.service';
import { AddNewUserDto } from './dto/sockets/add-new-user.dto';
import { AddMessageDto } from '../messages/dto/add-message.dto';
import { RemoveUserDto } from './dto/sockets/remove-user.dto';
import { UpdateMessageDto } from '../messages/dto/update-message.dto';
import { RemoveMessageDto } from '../messages/dto/remove-message.dto';
export declare class ChatsGateway {
    private readonly chatsService;
    private readonly messagesService;
    private readonly server;
    constructor(chatsService: ChatsService, messagesService: MessagesService);
    private emitMessageToChat;
    onAddUser(client: any, { chatId }: AddNewUserDto): Promise<void>;
    onRemoveUser(client: any, { chatId, userId }: RemoveUserDto): Promise<void>;
    onAddMessage(client: any, payload: AddMessageDto): Promise<void>;
    onUpdateMessage(client: any, payload: UpdateMessageDto): Promise<void>;
    onRemoveMessage(client: any, payload: RemoveMessageDto): Promise<void>;
}
