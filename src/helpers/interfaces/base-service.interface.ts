export interface BaseService<T> {
  findMany(payload: object): Promise<T[]>;
  findOne(id: number): Promise<T | undefined>;
  create(payload: Partial<T>): Promise<T | undefined>;
  update(id: number, payload: Partial<T>): Promise<T | undefined>;
  delete(id: number): Promise<void>;
}