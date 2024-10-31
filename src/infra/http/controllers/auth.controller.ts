import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserRepository } from "../../database/repositories/user.repository";
import { UserLoginInputDTO } from "../dtos/auth.dto.interface";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserLoginInputDTO;

  if (!email || !password) {
    res.status(400).json({ message: "Missing required fields!" });
    return;
  }

  const userRepository = new UserRepository();
  const userExists = await userRepository.existsByEmail(email);

  if (!userExists) {
    res.status(404).json({ message: "User does not exist!" });
    return;
  }

  const user = await userRepository.findByEmail(email);
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    res.status(401).json({ message: "Invalid password!" });
    return;
  }

  res.status(200).json({ message: "User logged in successfully!" });
};
export const register = async (req: Request, res: Response) => {};
