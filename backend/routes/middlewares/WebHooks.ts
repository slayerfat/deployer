import { Request, Response } from 'express';
import { LogInterface } from '../../models/logs/LogInterface';
import Log from '../../models/logs/Log';
import { JsonErrorResponse } from '../interfaces/JsonErrorResponse';

export class WebHooks {
  public static OK_BUT_REJECTED = 'Request ok, but Rejected.';
  public static FORBIDDEN = 'Forbidden.';
  private errorResponse: JsonErrorResponse = {
    success: false,
    message: ''
  };
  private request: Request;
  private data: LogInterface = {
    ip: '',
    headers: {},
    status: false,
    iteration: 0
  };

  constructor() {
  }

  /**
   * Handle an incoming request.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @returns {Function | Response}
   */
  public handle(req: Request, res: Response, next: Function) {
    this.request = req;
    this.data.ip = req.connection.remoteAddress;
    this.data.headers = req.headers;

    // we need to check the agent for bitBucket.
    if (req.get('User-Agent') === 'Bitbucket-Webhooks/2.0') {
      if (this.isValidBitBucketRequest()) {
        return next();
      }

      let log = new Log(this.data);
      return log.save().then(this.handleJsonErrorResponse(res, WebHooks.OK_BUT_REJECTED));
    }

    // github has its own custom header.
    if (req.get('X-GitHub-Event')) {
      if (this.isValidGitHubMasterRequest()) {
        return next();
      }

      let log = new Log(this.data);
      return log.save().then(this.handleJsonErrorResponse(res, WebHooks.OK_BUT_REJECTED));
    }

    // we don't know who is doing the request.
    this.data.status = false;
    this.data.results = [{message: WebHooks.FORBIDDEN}];

    let log = new Log(this.data);

    return log.save().then(this.handleJsonErrorResponse(res, WebHooks.FORBIDDEN));
  }

  /**
   * Handles the bitBucket request.
   *
   * @returns {boolean}
   */
  private isValidBitBucketRequest(): boolean {
    if (this.request.get('X-Event-Key') === 'repo:push') {
      return this.data.status = true;
    }

    this.data.results = [{message: 'Rejected: not a push event.'}];

    return this.data.status = false;
  }

  /**
   * Handles the gitHub request.
   *
   * @returns {boolean}
   */
  private isValidGitHubMasterRequest(): boolean {
    if (this.request.get('X-GitHub-Event') === 'push') {
      const payload = this.request.body;

      if (!payload) {
        this.data.results = [{message: 'Rejected: no payload.'}];

        return this.data.status = false;
      }

      if (payload.ref === 'refs/heads/master') {
        return this.data.status = true;
      }

      this.data.results = [{message: 'Rejected: not master branch.'}];

      return this.data.status = false;
    }

    this.data.results = [{message: 'Rejected: not a push event.'}];

    return this.data.status = false;
  }

  /**
   * If any of the request fails, then we seed this generic response handler.
   *
   * @param res
   * @param {string} message
   * @returns {Response}
   */
  private handleJsonErrorResponse(res, message: string) {
    this.errorResponse.message = message;

    return res.json(this.errorResponse);
  }
}
