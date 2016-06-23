import { Request, Response } from 'express';
import { LogInterface } from '../../models/logs/LogInterface';

export class WebHooks {
  static OK_BUT_REJECTED = 'Request ok, but Rejected.';
  static FORBIDDEN = 'Forbidden.';
  private request: Request;
  private data: LogInterface = {
    ip: '',
    headers: {},
    status: '',
    iteration: 0
  };

  constructor() {
  }

  handle(req: Request, res: Response, next: Function) {
    console.log('inside handle');
    this.request = req;
    this.data.ip = req.connection.remoteAddress;
    this.data.headers = req.headers;

    console.log('checking bitbucket');
    // we need to check the agent for bitBucket.
    if (req.get('User-Agent') == 'Bitbucket-Webhooks/2.0') {
      console.log('user agent is present');
      if (this.isValidBitBucketRequest()) {
        console.log('is a valid bitbucket request');
        return next();
      }
      // this.data.save();
      // TODO: save log

      console.log(WebHooks.OK_BUT_REJECTED);

      return res.json(WebHooks.OK_BUT_REJECTED);
    }

    console.log('checking github');
    // github has its own custom header.
    if (req.get('X-GitHub-Event')) {
      if (this.isValidGitHubMasterRequest()) {
        return next();
      }
      // TODO save log
      // this.data.save();

      console.log(WebHooks.OK_BUT_REJECTED);

      return res.json(WebHooks.OK_BUT_REJECTED);
    }

    console.log('no match found!');
    // we don't know who is doing the request.
    this.data.status = this.data.status || WebHooks.FORBIDDEN;

    // TODO save log
    // this.data.save();

    return res.status(403).json(WebHooks.FORBIDDEN);
  }

  private isValidBitBucketRequest() {
    if (this.request.get('X-Event-Key') == 'repo:push') {
      return true;
    }

    this.data.status = 'Rejected: not a push event.';

    return false;
  }

  private isValidGitHubMasterRequest() {
    if (this.request.get('X-GitHub-Event') == 'push') {
      const payload = this.getPayload();

      if (!payload) {
        this.data.status = 'Rejected: no payload.';

        return false;
      }

      if (payload.ref == 'refs/heads/master') {
        return true;
      }

      this.data.status = 'Rejected: not master branch.';

      return false;
    }

    this.data.status = 'Rejected: not a push event.';

    return false;
  }

  private getPayload() {
    // todo get payload
    return undefined;
  }
}
