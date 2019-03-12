import { Injectable } from '@nestjs/common';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
import { PaginationDto } from '../core/dto/pagination.dto';
import { FriendshipRequestsType } from './friendship-requests-type.enum';
import { FriendshipRequestsRepository } from './friendship-requests.repository';

@Injectable()
export class FriendshipRequestsService {

  constructor(
    private readonly friendshipRequestsRepository: FriendshipRequestsRepository,
  ) {}

  async findMany(userId: number, type: FriendshipRequestsType): Promise<FriendshipRequest[]> {
    const field = type === FriendshipRequestsType.INCOMING ? 'receiverId' : 'senderId';
    return await this.friendshipRequestsRepository.find({
      where: {
        [field]: userId
      },
      relations: [type === FriendshipRequestsType.INCOMING ? 'sender' : 'receiver']
    });
  }

  async findManyWithPagination(userId: number, { page, limit }: Required<PaginationDto>, type: FriendshipRequestsType): Promise<PaginatedResult<FriendshipRequest>> {
    const field = type === FriendshipRequestsType.INCOMING ? 'receiverId' : 'senderId';
    const [requests, totalCount] = await this.friendshipRequestsRepository.findAndCount({
      where: {
        [field]: userId
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: [type === FriendshipRequestsType.INCOMING ? 'receiver' : 'sender']
    });

    return {
      data: requests,
      page,
      totalCount,
      itemsPerPage: limit
    };
  }

  async findOne(id: number): Promise<FriendshipRequest | undefined> {
    return await this.friendshipRequestsRepository.findOne(id);
  }

  async findOneBySenderId(senderId: number): Promise<FriendshipRequest | undefined> {
    return await this.friendshipRequestsRepository.findOne({  senderId });
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