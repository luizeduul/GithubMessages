import { Request, Response } from "express";
import { ProfileUsersService } from "../services/ProfileUsersService";

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const service = new ProfileUsersService();

    const result = await service.execute(user_id);

    return response.json(result);
  }
}

export { ProfileUserController };
