import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { BaseRepository } from '../core/base.repository';
import { FindManyUsersListDto } from './dto/find-many-users-list.dto';

@Injectable()
export class UsersRepository extends BaseRepository<User> {

  constructor(@InjectModel('User') userModel: Model<User>) {
    super(userModel);
  }

  async findManyWithFilter({ query, ageTo, ageFrom, gender }: FindManyUsersListDto): Promise<User[]> {
    const filter: any = {
      gender
    };

    if(ageFrom || ageTo) {
      filter.age = {};
    }

    if(ageFrom) {
      filter.age.$gte = ageFrom;
    }

    if(ageTo) {
      filter.age.$lte = ageTo;
    }

    if(query) {
      filter.$text = { $search: query }
    }

    console.log(filter);

    return this.model.find(filter);
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    return this.model.find({ _id: { $in: ids } });
  }

  async findById(id: string): Promise<User | null> {
    return this.model.findById(id);
  }

  async findByIdAndFriendId(id: string, friendId: string): Promise<User | null> {
    return this.model.findOne({ _id: id, friends: friendId });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email });
  }

  async findUserFriends(userId: string): Promise<User[]> {
    return this.model.find({ friends: userId });
  }

  async addFriend(userId: string, friendId: string): Promise<User | null> {
    return this.model.findByIdAndUpdate(userId, { $addToSet: { friends: friendId }});
  }

  async removeFriend(userId: string, friendId: string): Promise<User | null> {
    return this.model.findByIdAndUpdate(userId, { $pull: { friends: friendId }});
  }

  async findUserWithFriend(userId: string, friendId: string): Promise<User | null> {
    return this.model.findOne({ _id: userId, friends: { $contains: friendId } });
  }
}