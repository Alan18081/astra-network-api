import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../core/base.repository';
import { File } from './file.interface';
import { Model } from 'mongoose';

@Injectable()
export class FilesRepository extends BaseRepository<File> {

  constructor(@InjectModel('File') filesModel: Model<File>) {
    super(filesModel);
  }


}