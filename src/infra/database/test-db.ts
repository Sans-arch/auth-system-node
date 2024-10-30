import { ApplicationDatabaseSource } from "./data-source";
import { UserModel } from "./models/user.model";

ApplicationDatabaseSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new UserModel();
    user.name = "San";
    user.email = "san@san.com";

    await ApplicationDatabaseSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await ApplicationDatabaseSource.manager.find(UserModel);
    console.log("Loaded users: ", users);

    //console.log("Here you can setup and run express / fastify / any other framework.");
  })
  .catch((error) => console.log(error));
