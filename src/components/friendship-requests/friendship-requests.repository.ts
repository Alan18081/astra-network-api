import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../core/base.repository';
import { FriendshipRequest } from './friendship-request.interface';
import { Model } from 'mongoose';

export class FriendshipRequestsRepository extends BaseRepository<FriendshipRequest> {

  constructor(@InjectModel('FriendshipRequest') model: Model<FriendshipRequest>) {
    super(model);
  }

  async findOneBySenderId(senderId: string): Promise<FriendshipRequest | null> {
    return super.model.findOne({ sender: senderId });
  }

}