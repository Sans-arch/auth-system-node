import { Request, Response } from "express";
import User from "../../../domain/entity/user";
import { UserInputDTO, UserOutputDTO } from "../dtos/user.dto.interface";

const users: User[] = [];

export const createUser = async (req: Request, res: Response<UserOutputDTO>) => {
  const { name, email } = req.body as UserInputDTO;

  const createdUser = new User({
    name,
    email,
  });

  users.push(createdUser);

  res.status(201).json({
    id: createdUser.id,
    name: createdUser.name,
    email: createdUser.email,
    createdAt: createdUser.created_at,
    updatedAt: createdUser.updated_at,
  });
};

export const getUser = async (req: Request, res: Response<UserOutputDTO | { message: string }>) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

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
