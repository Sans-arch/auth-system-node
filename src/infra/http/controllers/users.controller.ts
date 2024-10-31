import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../../domain/entity/user";
import { UserCreateInputDTO, UserOutputDTO, UserUpdateInputDTO } from "../dtos/user.dto.interface";
import { UserRepository } from "../../database/repositories/user.repository";

export const createUser = async (req: Request, res: Response<UserOutputDTO | { message: string }>) => {
  const { name, email, password } = req.body as UserCreateInputDTO;

  if (!name) {
    res.status(400).json({ message: "Name is required" });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  if (typeof name !== "string") {
    res.status(400).json({ message: "Name must be a string" });
    return;
  }

  if (typeof password !== "string") {
    res.status(400).json({ message: "Password must be a string" });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ message: "Password must be at least 6 characters long" });
    return;
  }

  if (typeof email !== "string") {
    res.status(400).json({ message: "Email must be a string" });
    return;
  }

  const userRepository = new UserRepository();
  const userAlreadyExists = await userRepository.existsByEmail(email);
  if (userAlreadyExists) {
    res.status(400).json({ message: "Email address already in use, try another one" });
    return;
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
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
