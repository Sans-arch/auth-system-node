import User from "../../../domain/entity/user";
import { RepositoryInterface } from "../../../domain/repository/repository.interface";
import { ApplicationDatabaseSource } from "../data-source";
import { UserModel } from "../models/user.model";

export class UserRepository implements RepositoryInterface<User> {
  async create(user: User): Promise<User> {
    const userModelRepository = ApplicationDatabaseSource.getRepository(UserModel);

    const persistedUser: UserModel = await userModelRepository.save({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });

    return new User({
      id: persistedUser.id,
      email: persistedUser.email,
      name: persistedUser.name,
      created_at: persistedUser.created_at,
      updated_at: persistedUser.updated_at,
    });
  }

  async findById(id: string): Promise<User> {
    const userModelRepository = ApplicationDatabaseSource.getRepository(UserModel);

    const userModel = await userModelRepository.findOneBy({
      id: id,
    });

    if (!userModel) {
      return null;
    }

    return new User({
      id: userModel.id,
      email: userModel.email,
      name: userModel.name,
      created_at: userModel.created_at,
      updated_at: userModel.updated_at,
    });
  }
}
