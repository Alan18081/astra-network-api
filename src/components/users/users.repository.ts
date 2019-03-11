import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { FindUsersListDto } from './dto/find-users-list.dto';

@Injectable()
export class UsersRepository {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findMany(payload: FindUsersListDto): Promise<User[]> {
    return this.userModel.find().exec();
  }

}