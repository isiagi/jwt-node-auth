import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type CustomRequest = Request & { user: {} };

export class NodeAuth {
  jwtSecret: string;
  jwtExpires: number;

  constructor(serect: string, expires: number) {
    this.jwtSecret = serect;
    this.jwtExpires = expires;
    this.requireAuth = this.requireAuth.bind(this);
  }

  async requireAuth(
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

  async getSignedJwtToken(payload: {}) {
 
    return JWT.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpires,
    });
  }
}
