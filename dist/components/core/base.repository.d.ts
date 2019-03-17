import { Model, Document } from 'mongoose';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
export declare class BaseRepository<T extends Document> {
    readonly model: Model<T>;
    constructor(model: Model<T>);
    findMany(query: Partial<T>): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findManyWithPagination(query: Partial<T>, { page, limit }: Required<PaginationDto>): Promise<PaginatedResult<T>>;
    updateById(id: string, payload: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<void>;
    save(payload: Partial<T>): Promise<T>;
}
