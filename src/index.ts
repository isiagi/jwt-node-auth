import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type CustomRequest = Request & { user: {} };

const getSignedJwtToken = async (
  payload: {},
  serect: string,
  expire: number
) => {
  console.log("hello");
  return JWT.sign(payload, serect, {
    expiresIn: expire,
  });
};

const authenticationMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers.authorization;

  let token = "";

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid authorization" });
  }

  token = authHeaders.split(" ")[1];

  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    req.user = { decode };
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid authorization" });
  }
};

export { authenticationMiddleware, getSignedJwtToken };
