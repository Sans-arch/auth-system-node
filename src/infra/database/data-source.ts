import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserModel } from "./models/user.model";

export const ApplicationDatabaseSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [UserModel],
  migrations: [],
  subscribers: [],
});
