import { Request, Response } from 'express';
import { LogRepository } from '../../repositories/LogRepository';
import { JsonErrorResponse } from '../interfaces/JsonErrorResponse';
import { Auth } from '../middlewares/Auth';

export default function targetRoute(app, router) {
  // TODO: IOC
  const logRepo = new LogRepository();
  const auth = new Auth();
  let msg: JsonErrorResponse;
  router.use(auth.handle.bind(auth));

  router.get('/logs', (req: Request, res: Response) => {
    logRepo.getAll().then(logs => {
      return res.json(logs);
    }, err => {
      msg = {message: err.message};
      return res.status(400).json(msg);
    });
  });

  router.post('/logs/find', (req: Request, res: Response) => {
    logRepo.getOne(req.body.id).then(log => {
      return res.json(log);
    }, err => {
      msg = {message: err.message};
      return res.status(400).json(msg);
    });
  });

  router.get('/logs/latest', (req: Request, res: Response) => {
    logRepo.getLatest().then(logs => {
      return res.json(logs);
    }, err => {
      msg = {message: err.message};
      return res.status(400).json(msg);
    });
  });

  router.post('/logs', (req: Request, res: Response) => {
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
      msg = {message: err.message};
      return res.status(400).json(msg);
    });
  });
}
