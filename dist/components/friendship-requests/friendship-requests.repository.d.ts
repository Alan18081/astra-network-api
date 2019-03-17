import { BaseRepository } from '../core/base.repository';
import { FriendshipRequest } from './friendship-request.interface';
import { Model } from 'mongoose';
export declare class FriendshipRequestsRepository extends BaseRepository<FriendshipRequest> {
    constructor(model: Model<FriendshipRequest>);
    findOneBySenderId(senderId: string): Promise<FriendshipRequest | null>;
    findByIdAndSenderId(id: string, senderId: string): Promise<FriendshipRequest | null>;
    findByIdAndReceiverId(id: string, receiverId: string): Promise<FriendshipRequest | null>;
}
