import User from "../entity/user";
import { RepositoryInterface } from "./repository.interface";

export interface UserRepositoryInterface extends RepositoryInterface<User> {}
