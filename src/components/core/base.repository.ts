import { Model, Schema, Document } from 'mongoose';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';

export class BaseRepository<T extends Document> {

  public readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findMany(query: Partial<T>): Promise<T[]> {
    return this.model.find(query).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findOne({_id: new Schema.Types.ObjectId(id)});
  }

  async findManyWithPagination(query: Partial<T>, {page, limit}: Required<PaginationDto>): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const cursor = this.model.find(query);

    const [data, totalCount] = await Promise.all([
      cursor.skip(skip).limit(limit).exec(),
      cursor.count(),
    ]);

    return {
      page,
      itemsPerPage: limit,
      totalCount,
      data,
    };
  }

  async updateById(id: string, payload: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, { $set: payload });
  }

  async deleteById(id: string): Promise<void> {
    await this.model.deleteOne({_id: id});
  }

  async save(payload: Partial<T>): Promise<T> {
    const entity = new this.model(payload);
    return entity.save();
  }

}