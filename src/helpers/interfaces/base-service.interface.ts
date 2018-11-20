export interface BaseService<T> {
  findMany(query: object): Promise<T[]>;
  findOne(id: number, query: object): Promise<T | undefined>;
  createOne(payload: object): Promise<T | undefined>;
  updateOne(id: number, payload: Partial<T>): Promise<T | undefined>;
  deleteOne(id: number): Promise<void>;
}