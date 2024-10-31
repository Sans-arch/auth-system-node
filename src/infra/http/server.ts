import "dotenv/config";
import express from "express";
import usersRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import { ApplicationDatabaseSource } from "../database/data-source";
import { logger } from "../../config/logger";

ApplicationDatabaseSource.initialize()
  .then(() => {
    // Initialize Express only if the ApplicationDatabaseSource connection was successfully
    const server = express();
    server.disable("x-powered-by");
    const port = process.env.SERVER_PORT ?? 5000;

    server.use(express.json());
    server.use("/users", usersRouter);
    server.use("/auth", authRouter);

    server.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
