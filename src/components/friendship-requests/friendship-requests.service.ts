import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipRequest } from './friendship-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendshipRequestsService {

  constructor(
    @InjectRepository(FriendshipRequest)
    private readonly friendshipRequestsRepository: Repository<FriendshipRequest>,
  ) {}

  async findIncomingRequests(userId: number): Promise<FriendshipRequest[]> {
    return await this.friendshipRequestsRepository.find({
      where: {
        receiverId: userId
      },
      relations: ['sender']
    });
  }

  async findOutgoingRequests(userId: number): Promise<FriendshipRequest[]> {
    return await this.friendshipRequestsRepository.find({
      where: {
        senderId: userId
      },
      relations: ['receiver']
    });
  }

  async findOne(id: number): Promise<FriendshipRequest | undefined> {
    return await this.friendshipRequestsRepository.findOne(id);
  }

  async createOne(senderId: number, receiverId: number, message?: string): Promise<FriendshipRequest> {
    const friendRequest = new FriendshipRequest({
      senderId,
      receiverId,
      message
    });

    return await this.friendshipRequestsRepository.save(friendRequest);
  }

  async deleteOne(id: number): Promise<void> {
    await this.friendshipRequestsRepository.delete({ id });
  }
}