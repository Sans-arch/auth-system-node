import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

  const tokenPayload = {
    id: user.id,
    username: user.email,
  };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true, // cookie cannot be accessed by client-side scripts, only by the server-side
      secure: process.env.NODE_ENV === "production", // cookie will only be sent over HTTPS
      sameSite: "strict", // cookie will only be sent to the same domain
      maxAge: 1000 * 60 * 60, // 1 hour, cookie will expire after 1 hour
    })
    .json({ token });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).clearCookie("access_token").json({ message: "Logged out successfully!" });
};
