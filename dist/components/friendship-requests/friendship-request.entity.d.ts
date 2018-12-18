import { BaseEntity } from '../core/base.entity';
import { User } from '../users/user.entity';
export declare class FriendshipRequest extends BaseEntity {
    receiverId: number;
    receiver: User;
    senderId: number;
    sender: User;
    message?: string;
    constructor(data: Partial<FriendshipRequest>);
}
