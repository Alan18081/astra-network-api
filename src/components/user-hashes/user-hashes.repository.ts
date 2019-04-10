import { BaseRepository } from '../core/base.repository';
import { UserHash } from './user-hash.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserHashesRepository extends BaseRepository<UserHash> {

  constructor(@InjectModel('UserHash') userHashModel: Model<UserHash>) {
    super(userHashModel);
  }

  async findOneByHash(hash: string): Promise<UserHash | null> {
    return super.model.findOne({ hash });
  }

}