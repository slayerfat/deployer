import { Request, Response } from 'express';
import { TargetRepository } from '../../repositories/TargetRepository';
import { LogRepository } from '../../repositories/LogRepository';
import { LogInterface } from '../../models/logs/LogInterface';

// TODO: jwt
// import * as jwt from 'jsonwebtoken';

export default function targetRoute(app) {
  // TODO: IOC
  const targetRepo = new TargetRepository();
  const logRepo = new LogRepository();

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
      return res.json(target);
    }, err => {
      return res.status(400).json({err: err});
    });
  });

  app.get('/api/targets/pull/:slug', (req: Request, res: Response) => {
    const slug = req.params.slug;

    // default data for all logs
    let data: LogInterface = {
      ip: req.connection.remoteAddress,
      headers: req.headers,
      status: ''
    };

    targetRepo.getBySlug(slug).then(target => {
      if (!target) {
        data.status = {
          success: false,
          message: 'Target not found',
          target: slug
        };

        // if no target is found, then we just
        // respond with the status already made
        return logRepo.store(data).then(() => {
          res.json(data.status);
        }, err => {
          res.status(500).json({
            success: false,
            message: 'Unknown server error, cant save new Log.'
          });
        });
      }

      // if there is a target, we just respond ok
      // TODO: execute commands
      data.status = {sucess: true};
      data.target = target._id;

      logRepo.store(data).then(() => {
        return res.json({sucess: true});
      });
    }).catch(err => {
      return res.json({success: false});
    });
  });
}
