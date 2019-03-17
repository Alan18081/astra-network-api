import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { FriendshipRequestsType } from './friendship-requests-type.enum';
import { FriendshipRequestsRepository } from './friendship-requests.repository';
import {FriendshipRequest} from './friendship-request.interface';
import {CreateRequestDto} from './dto/create-request.dto';
import {Messages} from '../../helpers/enums/messages.enum';
import {UsersService} from '../users/users.service';
import {User} from '../users/user.interface';

@Injectable()
export class FriendshipRequestsService {

  constructor(
    private readonly friendshipRequestsRepository: FriendshipRequestsRepository,
    private readonly usersService: UsersService
  ) {}

  private async checkIsValidOwner(id: string, userId: string): Promise<void> {
    const request = await this.friendshipRequestsRepository.findByIdAndSenderId(id, userId);
    if(!request) {
      throw new ForbiddenException(Messages.PROVIDED_USER_IS_NOT_SENDER);
    }
  }

  async findMany(userId: number, type: FriendshipRequestsType): Promise<FriendshipRequest[]> {
    const field = type === FriendshipRequestsType.INCOMING ? 'receiver' : 'sender';
    return this.friendshipRequestsRepository.findMany({[field]: userId});
  }

  async findOne(id: string): Promise<FriendshipRequest | null> {
    return await this.friendshipRequestsRepository.findById(id);
  }

  async findOneBySenderId(senderId: string): Promise<FriendshipRequest | null> {
    return this.friendshipRequestsRepository.findOneBySenderId(senderId);
  }

  async createOne(senderId: string, dto: CreateRequestDto): Promise<FriendshipRequest> {
    const friendRequest: Partial<FriendshipRequest> = {
      sender: senderId,
      receiver: dto.receiverId,
      message: dto.message,
    };

    return this.friendshipRequestsRepository.save(friendRequest);
  }

  async deleteOne(id: string, userId: string): Promise<void> {
    await this.checkIsValidOwner(id, userId);
    return this.friendshipRequestsRepository.deleteById(id);
  }

  async acceptOne(id: string, userId: string): Promise<User> {
      const request = await this.friendshipRequestsRepository.findByIdAndReceiverId(id, userId);
      if(!request) {
          throw new NotFoundException(Messages.FRIENDSHIP_REQUEST_NOT_FOUND);
      }

      const [friend] = await Promise.all([
          this.usersService.addFriend(userId, request.sender as string),
          this.usersService.addFriend(request.sender as string, userId),
          this.friendshipRequestsRepository.deleteById(request._id),
      ]);

      if(!friend) {
          throw new NotFoundException(Messages.FRIENDSHIP_REQUESTS_SENDER_IS_NOT_FOUND);
      }

      return friend;
  }
}