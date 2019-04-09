import { BaseRepository } from '../core/base.repository';
import { File } from './file.interface';
import { Model } from 'mongoose';
export declare class FilesRepository extends BaseRepository<File> {
    constructor(filesModel: Model<File>);
}
