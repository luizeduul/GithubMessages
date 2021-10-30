import "dotenv/config";
import express, { Request, Response } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateMessageController } from "../controllers/CreateMessageController";
import { GetLastThreeMessagesController } from "../controllers/GetLastThreeMessagesController";
import { ProfileUserController } from "../controllers/ProfileUsersController";
import { EnsureAuthenticated } from "../middlewares/EnsureAuthenticated";

const clientd_id = process.env.GITHUB_CLIENT_ID;

const routes = express.Router();

routes.get("/login", (request: Request, response: Response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientd_id}`
  );
});

routes.get("/signin/callback", (request: Request, response: Response) => {
  const { code } = request.query;

  return response.json(code);
});

routes.post("/auth", new AuthenticateUserController().handle);

routes.post("/messages", EnsureAuthenticated, new CreateMessageController().handle);

routes.get("/messages/last-three", new GetLastThreeMessagesController().handle);

routes.get("/profile", EnsureAuthenticated, new ProfileUserController().handle);



export { routes };
