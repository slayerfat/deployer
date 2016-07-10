import { JsonErrorResponse } from '../interfaces/JsonErrorResponse';
import { Request, Response } from 'express';

export abstract class Middleware {

  /**
   * The forbidden message to be printed back.
   *
   * @type {string}
   */
  public static FORBIDDEN = 'Forbidden.';

  /**
   * The request is ok, but rejected for business logic reasons.
   *
   * @type {string}
   */
  public static OK_BUT_REJECTED = 'Request ok, but Rejected.';

  /**
   * The standard error response of a middleware.
   *
   * @type {{success: boolean, message: string}}
   */
  protected errorResponse: JsonErrorResponse = {
    success: false,
    message: ''
  };

  /**
   * The incoming request object.
   *
   * @type {Request}
   */
  protected request: Request;

  /**
   * Handle an incoming request.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @returns {Function | Response}
   */
  public abstract handle(req: Request, res: Response, next: Function);

  /**
   * If any of the request fails, then we seed this generic response handler.
   *
   * @param res
   * @param {string} message
   * @param {number=} code
   * @returns {Response}
   */
  protected handleJsonErrorResponse(res, message: string, code = 200) {
    this.errorResponse.message = message;

    return res.status(code).json(this.errorResponse);
  }
}
