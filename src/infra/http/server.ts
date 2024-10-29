import express from "express";
import usersRouter from "./routes/users";

const server = express();
server.disable("x-powered-by");
const port = 5000;

server.use(express.json());
server.use("/users", usersRouter);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
