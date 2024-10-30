import User from "../../../domain/entity/user";
import { UserRepositoryInterface } from "../../../domain/repository/user.repository.interface";
import { ApplicationDatabaseSource } from "../data-source";
import { UserModel } from "../models/user.model";

export class UserRepository implements UserRepositoryInterface {
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

  async update(existingUser: User): Promise<User> {
    const userModelRepository = ApplicationDatabaseSource.getRepository(UserModel);

    const updatedPersistedUser: UserModel = await userModelRepository.save({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      created_at: existingUser.created_at,
      updated_at: existingUser.updated_at,
    });

    return new User({
      id: updatedPersistedUser.id,
      email: updatedPersistedUser.email,
      name: updatedPersistedUser.name,
      created_at: updatedPersistedUser.created_at,
      updated_at: updatedPersistedUser.updated_at,
    });
  }

  async delete(id: string): Promise<void> {
    const userModelRepository = ApplicationDatabaseSource.getRepository(UserModel);

    const userToDelete: UserModel = await userModelRepository.findOneBy({ id });

    if (!userToDelete) {
      throw new Error(`User with id ${id} not found`);
    }

    console.log({ userToDelete });

    await userModelRepository.remove(userToDelete);
  }
}
