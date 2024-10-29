import express, { Request, Response } from "express";
import usersRouter from "./routes/users";

const server = express();
const port = 5000;

server.use(express.json());

server.use("/users", usersRouter);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
