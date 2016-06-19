import { Request, Response } from 'express';
import { LogRepository } from '../../repositories/LogRepository';

// TODO: jwt
// import * as jwt from 'jsonwebtoken';

export default function targetRoute(app) {
  // TODO: IOC
  const logRepo = new LogRepository();

  app.get('/api/logs', (req: Request, res: Response) => {
    logRepo.getAll().then(logs => {
      return res.json(logs);
    }, err => {
      return res.status(400).json({err: err});
    });
  });

  app.post('/api/logs', (req: Request, res: Response) => {
    logRepo.store({
      target: req.body.target,
      ip: req.body.ip,
      headers: req.body.headers,
      status: req.body.status,
      results: req.body.results,
      error: req.body.error,
      errorCode: req.body.errorCode
    }).then(log => {
      return res.json({success: true, log: log});
    }, err => {
      return res.status(400).json({err: err});
    });
  });
}
