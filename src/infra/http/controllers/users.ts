import { Request, Response } from "express";

const users = [];

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body;
};

export const getUsers = async (req: Request, res: Response) => {
  res.json([
    { id: 1, nome: "João" },
    { id: 2, nome: "Maria" },
  ]);
};
