import { MessagesService } from './messages.service';
import { AddMessageDto } from './dto/add-message.dto';
import { Message } from './message.interface';
import { User } from '../users/user.interface';
import { PublisherService } from '../core/services/publisher.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageInfo } from './interfaces/message-info.interface';
export declare class MessagesResolver {
    private readonly messagesService;
    private readonly publisherService;
    constructor(messagesService: MessagesService, publisherService: PublisherService);
    sendMessage(user: User, dto: AddMessageDto): Promise<Message | null>;
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
