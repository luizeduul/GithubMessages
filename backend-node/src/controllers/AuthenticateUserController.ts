import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;
    const authenticateService = new AuthenticateUserService();
    
    try{
      const result = await authenticateService.execute(code);
      return response.json(result);

    }catch (err){
      return response.status(404).json(err.message);
    }

  }
}

export { AuthenticateUserController };
