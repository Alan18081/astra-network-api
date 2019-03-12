import { BaseRepository } from '../core/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refresh-token.interface';

@Injectable()
export class RefreshTokensRepository extends BaseRepository<RefreshToken> {

  constructor(@InjectModel('RefreshToken') private readonly userHashModel: Model<RefreshToken>) {
    super(userHashModel);
  }

  async findOneByToken(token: string): Promise<RefreshToken | null> {
    return this.userHashModel.findOne({ token });
  }

  async findOneByUserId(userId: string): Promise<RefreshToken | null> {
    return this.userHashModel.findOne({ userId });
  }

}