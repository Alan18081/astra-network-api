import { Injectable } from '@nestjs/common';
import { Model, Schema, Document } from 'mongoose';

@Injectable()
export class BaseRepository<T extends Document> {

  constructor(private readonly model: Model<T>) {}

  async findMany(query: Partial<T>): Promise<T[]> {
    return this.model.find(query).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findOne({_id: new Schema.Types.ObjectId(id)});
  }

}