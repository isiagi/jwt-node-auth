import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type CustomRequest = Request & { user: {} };

export class NodeAuth {
  jwtSecret: any;

  constructor(serect: string) {
    this.jwtSecret = serect;
    this.authenticationMiddleware = this.authenticationMiddleware.bind(this);
  }

  async authenticationMiddleware(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    const authHeaders = req.headers.authorization;

    let token = "";

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Please provide auth headers" });
    }

    token = authHeaders.split(" ")[1];

    try {
      const decode = JWT.verify(token, this.jwtSecret);

      req.user = decode ;

      next();
      
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getSignedJwtToken(payload: {}, expire: number) {
 
    return JWT.sign(payload, this.jwtSecret, {
      expiresIn: expire,
    });
  }
}
