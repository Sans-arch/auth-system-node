import { Request, Response } from "express";
import User from "../../../domain/entity/user";
import { UserCreateInputDTO, UserOutputDTO, UserUpdateInputDTO } from "../dtos/user.dto.interface";
import { UserRepository } from "../../database/repositories/user.repository";

export const createUser = async (req: Request, res: Response<UserOutputDTO | { message: string }>) => {
  const { name, email, password } = req.body as UserCreateInputDTO;
  const userRepository = new UserRepository();

  try {
    const userAlreadyExists = await userRepository.existsByEmail(email);

    if (userAlreadyExists) {
      res.status(400).json({ message: "Email address already in use, try another one" });
      return;
    }

    const createdUser = new User({
      name,
      email,
      password,
    });

    const persistedUser = await userRepository.create(createdUser);

    res.status(201).json({
      id: persistedUser.id,
      name: persistedUser.name,
      email: persistedUser.email,
      createdAt: persistedUser.created_at,
      updatedAt: persistedUser.updated_at,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const getUser = async (req: Request, res: Response<UserOutputDTO | { message: string }>) => {
  const { id } = req.params;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  });
};

export const updateUser = async (req: Request, res: Response<UserOutputDTO | { message: string }>) => {
  const { id } = req.params;

  const userRepository = new UserRepository();
  const existingUser = await userRepository.findById(id);

  if (!existingUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const { name, email } = req.body as UserUpdateInputDTO;

  existingUser.changeName(name);
  existingUser.changeEmail(email);

  const updatedUser = await userRepository.update(existingUser);

  res.status(200).json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    createdAt: updatedUser.created_at,
    updatedAt: updatedUser.updated_at,
  });
};

export const deleteUser = async (req: Request, res: Response<{ message: string }>) => {
  const { id } = req.params;

  const userRepository = new UserRepository();

  try {
    await userRepository.delete(id);
    res.status(204).send();
  } catch (e) {
    res.status(404).json({ message: "User not found" });
  }
};
