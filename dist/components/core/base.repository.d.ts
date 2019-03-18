import { Model, Document } from 'mongoose';
export declare class BaseRepository<T extends Document> {
    readonly model: Model<T>;
    constructor(model: Model<T>);
    findMany(query: Partial<T>, skip?: number, limit?: number): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    updateById(id: string, payload: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<void>;
    save(payload: Partial<T>): Promise<T>;
}
