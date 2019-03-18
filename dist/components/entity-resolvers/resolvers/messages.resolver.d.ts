import { MessagesService } from '../../messages/messages.service';
import { AddMessageDto } from '../../messages/dto/add-message.dto';
import { Message } from '../../messages/message.interface';
import { User } from '../../users/user.interface';
import { PublisherService } from '../../core/services/publisher.service';
import { UpdateMessageDto } from '../../messages/dto/update-message.dto';
import { MessageInfo } from '../../messages/interfaces/message-info.interface';
import { ChatsService } from '../../chats/chats.service';
import { UsersService } from '../../users/users.service';
export declare class MessagesResolver {
    private readonly messagesService;
    private readonly usersService;
    private readonly publisherService;
    private readonly chatsService;
    constructor(messagesService: MessagesService, usersService: UsersService, publisherService: PublisherService, chatsService: ChatsService);
    author(message: Message): Promise<User | null>;
    sendMessage(user: User, dto: AddMessageDto): Promise<Message>;
    editMessage(user: User, id: string, dto: UpdateMessageDto): Promise<Message | null>;
    deleteMessage(user: User, id: string): Promise<MessageInfo>;
    messageAdded(): {
        resolve(payload: any): any;
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
    onMessageEditedToChat(): {
        resolve(payload: any): any;
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
    onMessageRemovedFromChat(id: string): {
        resolve(payload: any): any;
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
}
