export interface RepositoryInterface<T> {
  create(entity: T): Promise<T>;
  findById(id: string): Promise<T>;
  delete(id: string): Promise<void>;
  update(entity: T): Promise<T>;
}
