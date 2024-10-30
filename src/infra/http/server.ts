import express from "express";
import usersRouter from "./routes/users";
import { ApplicationDatabaseSource } from "../database/data-source";

ApplicationDatabaseSource.initialize()
  .then(() => {
    // Initialize Express only if the ApplicationDatabaseSource connection was successfully
    const server = express();
    server.disable("x-powered-by");
    const port = 5000;

    server.use(express.json());
    server.use("/users", usersRouter);

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
