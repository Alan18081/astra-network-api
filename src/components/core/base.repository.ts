import { Model, Schema, Document } from 'mongoose';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';

export class BaseRepository<T extends Document> {

  public readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findMany(query: Partial<T>, skip: number = 0, limit: number = 10): Promise<T[]> {
    return this.model.find(query).skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async updateById(id: string, payload: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, { $set: payload }, { new: true });
  }

  async deleteById(id: string): Promise<void> {
    await this.model.deleteOne({_id: id});
  }

  async save(payload: Partial<T>): Promise<T> {
    const entity = new this.model(payload);
    return entity.save();
  }

}