import User from "../entity/user";
import { RepositoryInterface } from "./repository.interface";

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  existsByEmail: (email: string) => Promise<boolean>;
}
