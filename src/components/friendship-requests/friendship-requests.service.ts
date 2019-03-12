import { Injectable } from '@nestjs/common';
import { FriendshipRequestsType } from './friendship-requests-type.enum';
import { FriendshipRequestsRepository } from './friendship-requests.repository';
import {FriendshipRequest} from './friendship-request.interface';

@Injectable()
export class FriendshipRequestsService {

  constructor(
    private readonly friendshipRequestsRepository: FriendshipRequestsRepository,
  ) {}

  async findMany(userId: number, type: FriendshipRequestsType): Promise<FriendshipRequest[]> {
    const field = type === FriendshipRequestsType.INCOMING ? 'receiverId' : 'senderId';
    return this.friendshipRequestsRepository.findMany({[field]: userId});
  }

  async findOne(id: string): Promise<FriendshipRequest | null> {
    return await this.friendshipRequestsRepository.findById(id);
  }

  async findOneBySenderId(senderId: string): Promise<FriendshipRequest | null> {
    return this.friendshipRequestsRepository.findOneBySenderId(senderId);
  }

  async createOne(senderId: string, receiverId: string, message?: string): Promise<FriendshipRequest> {
    const friendRequest: Partial<FriendshipRequest> = {
      sender: senderId,
      receiver: receiverId,
      message
    };

    return this.friendshipRequestsRepository.save(friendRequest);
  }

  async deleteOne(id: string): Promise<void> {
    await this.friendshipRequestsRepository.deleteById(id);
  }
}