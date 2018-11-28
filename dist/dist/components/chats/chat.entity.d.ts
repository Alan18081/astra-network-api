import { BaseEntity } from '../core/base.entity';
import { User } from '../users/user.entity';
import { Message } from '../messages/message.entity';
export declare class Chat extends BaseEntity {
    name: string;
    users: User[];
    messages: Message[];
}
