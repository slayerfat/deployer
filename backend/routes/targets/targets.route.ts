import { Request, Response } from 'express';
import { TargetRepository } from '../../repositories/TargetRepository';

// TODO: jwt
// import * as jwt from 'jsonwebtoken';

export default function targetRoute(app) {
  // TODO: IOC
  const targetRepo = new TargetRepository();

  app.get('/api/targets', (req: Request, res: Response) => {
    targetRepo.getAll().then(targets => {
      return res.json(targets);
    }, err => {
      return res.status(400).json({err: err});
    });
  });

  app.post('/api/targets', (req: Request, res: Response) => {
    targetRepo.store({
      name: req.body.name,
      commands: req.body.commands
    }).then(target => {
      return res.json({success: true, target: target});
    }, err => {
      return res.status(400).json({err: err});
    });
  });
}
