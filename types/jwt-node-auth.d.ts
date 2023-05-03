import { VerifyOptions, SignOptions } from "jsonwebtoken";

declare module "jsonwebtoken" {
    interface JwtPayload {
      [key: string]: any;
    }
  
    function verify(token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions): JwtPayload | string;
    function sign(payload: string | Buffer | object, secretOrPrivateKey: string | Buffer, options?: SignOptions): string;
  }
  
  import { Request, Response, NextFunction } from "express";
  
  interface CustomRequest extends Request {
    user: Record<string, any>;
  }
  
  declare class NodeAuth {
    constructor(secret: string, expires: number);
  
    requireAuth(req: CustomRequest, res: Response, next: NextFunction): void;
    getSignedJwtToken(payload: {}): Promise<string>;
  }
  
  export default NodeAuth;
  