import { Request, Response } from 'express';
import { LogInterface } from '../../models/logs/LogInterface';
import Log from '../../models/logs/Log';

export class WebHooks {
  public static OK_BUT_REJECTED = 'Request ok, but Rejected.';
  public static FORBIDDEN = 'Forbidden.';
  private request: Request;
  private data: LogInterface = {
    ip: '',
    headers: {},
    status: '',
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
      return log.save().then(() => res.json(WebHooks.OK_BUT_REJECTED));
    }

    // github has its own custom header.
    if (req.get('X-GitHub-Event')) {
      if (this.isValidGitHubMasterRequest()) {
        return next();
      }

      let log = new Log(this.data);
      return log.save().then(() => res.json(WebHooks.OK_BUT_REJECTED));
    }

    // we don't know who is doing the request.
    this.data.status = this.data.status || WebHooks.FORBIDDEN;

    let log = new Log(this.data);
    return log.save().then(() => res.json(WebHooks.FORBIDDEN));
  }

  /**
   * Handles the bitBucket request.
   *
   * @returns {boolean}
   */
  private isValidBitBucketRequest() {
    if (this.request.get('X-Event-Key') === 'repo:push') {
      return true;
    }

    this.data.status = 'Rejected: not a push event.';

    return false;
  }

  /**
   * Handles the gitHub request.
   *
   * @returns {boolean}
   */
  private isValidGitHubMasterRequest() {
    if (this.request.get('X-GitHub-Event') === 'push') {
      const payload = this.request.body;

      if (!payload) {
        this.data.status = 'Rejected: no payload.';

        return false;
      }

      if (payload.ref === 'refs/heads/master') {
        return true;
      }

      this.data.status = 'Rejected: not master branch.';

      return false;
    }

    this.data.status = 'Rejected: not a push event.';

    return false;
  }
}
