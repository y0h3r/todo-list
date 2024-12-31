export interface BaseRepository<T> {
  create(entity: Omit<T, 'id'>): Promise<T>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: string, entity: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
