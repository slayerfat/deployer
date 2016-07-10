import { Middleware } from './Middleware';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../../config/config';

export class Auth extends Middleware {

  /**
   * Message to be send when no token is found.
   *
   * @type {string}
   */
  public static NO_TOKEN = 'Invalid or missing token.';

  /**
   * Message to be send when token is invalid.
   *
   * @type {string}
   */
  public static ILLEGAL_TOKEN = 'Illegal token.';

  public handle(req: Request, res: Response, next: Function) {
    let token = req.get('X-Deployer-Auth');
    if (!token) {
      return this.handleJsonErrorResponse(res, Auth.NO_TOKEN, 401);
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return this.handleJsonErrorResponse(res, Auth.ILLEGAL_TOKEN, 403);
      }

      if (decoded) {
        return next();
      }

      this.handleJsonErrorResponse(res, Auth.ERROR, 401);
    });
  }
}
