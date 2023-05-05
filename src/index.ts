import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type CustomRequest = Request & { user: {} };

export class NodeAuth {
  jwtSecret: string;
  jwtExpires: number;

  constructor(serect: string, expires: number) {
    this.jwtSecret = serect;
    this.jwtExpires = expires;
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

    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      token = authHeaders.split(" ")[1];
    }

    try {
      const decode = JWT.verify(token, this.jwtSecret);

      req.user = decode;

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

  async useCookieToken(res: Response, payload: Record<string, any>, age: number = 5, stage: string = "dev") {
    const token = this.getSignedJwtToken(payload);
  
    const cookieOptions = {
      maxAge: age * 60 * 1000, // default of 5 minutes
      httpOnly: true,
      secure: false
    };
  
    if (stage === "production") cookieOptions.secure = true; // only for SSL in production
  
    res.cookie("jwt", token, cookieOptions);
  
    return res.status(200).json({ message: "success", token });
  }  
}
