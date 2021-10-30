import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}
function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const accessToken = request.headers.authorization;

  if (!accessToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  const [, token] = accessToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ errorCode: "token.expired" });
  }
}

export { EnsureAuthenticated };
