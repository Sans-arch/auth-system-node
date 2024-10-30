export interface RepositoryInterface<T> {
  create(entity: T): Promise<T>;
  findById(id: string): Promise<T>;
  update(entity: T): Promise<T>;
}
