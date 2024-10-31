import "dotenv/config";
import express from "express";
import path from "node:path";
import usersRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import { ApplicationDatabaseSource } from "../database/data-source";
import { logger } from "../../config/logger";

ApplicationDatabaseSource.initialize()
  .then(() => {
    // Initialize Express only if the ApplicationDatabaseSource connection was successfully
    const port = process.env.SERVER_PORT ?? 5000;
    const server = express();
    server.disable("x-powered-by");
    server.set("view engine", "ejs");
    server.set("views", path.join(__dirname, "/views"));
    server.use(express.json());

    server.get("/", (req, res) => {
      res.render("index");
    });

    server.get("/protected", (req, res) => {
      res.render("protected");
    });

    server.use("/users", usersRouter);
    server.use("/auth", authRouter);

    server.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
