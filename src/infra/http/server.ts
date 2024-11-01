import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
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
    server.use(cookieParser());

    server.use((req, res, next) => {
      const token = req.cookies["access_token"];
      req["session"] = { user: null };

      try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req["session"].user = data;
      } catch {}

      next();
    });

    server.get("/", (req, res) => {
      const { user } = req["session"];
      res.render("index", user);
    });

    server.get("/protected", (req, res) => {
      const { user } = req["session"];
      if (!user) {
        res.status(403).send("Unauthorized");
        return;
      }

      res.render("protected", user);
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
