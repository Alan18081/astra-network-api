import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { BaseRepository } from '../core/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<User> {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel);
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findOneByGoogleId(googleId: string): Promise<User | null> {
    return this.userModel.findOne({ googleId });
  }

  async findUserFriends(userId: string): Promise<User[]> {
    return this.userModel.find({ friends: { $contains: userId } });
  }


}