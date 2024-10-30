import { Request, Response } from "express";
import User from "../../../domain/entity/user";
import { UserInputDTO, UserOutputDTO } from "../dtos/user.dto.interface";
import { UserRepository } from "../../database/repositories/user.repository";

export const createUser = async (req: Request, res: Response<UserOutputDTO>) => {
  const { name, email } = req.body as UserInputDTO;

  const createdUser = new User({
    name,
    email,
  });

  const userRepository = new UserRepository();
  const persistedUser = await userRepository.create(createdUser);

  res.status(201).json({
    id: persistedUser.id,
    name: persistedUser.name,
    email: persistedUser.email,
    createdAt: persistedUser.created_at,
    updatedAt: persistedUser.updated_at,
  });
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
