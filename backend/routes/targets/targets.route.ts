import { Request, Response } from 'express';
import { TargetRepository } from '../../repositories/TargetRepository';
import { LogRepository } from '../../repositories/LogRepository';
import { LogInterface } from '../../models/logs/LogInterface';
import { ExecService } from '../../services/ExecService';
import { WebHooks } from '../middlewares/WebHooks';

// TODO: jwt
// import * as jwt from 'jsonwebtoken';

export default function targetRoute(app, router) {
  // TODO: IOC
  const targetRepo = new TargetRepository();
  const logRepo = new LogRepository();
  const exec = new ExecService();
  const webHook = new WebHooks();

  /**
   * Gets a list of elements.
   */
  router.get('/targets', (req: Request, res: Response) => {
    targetRepo.getAll().then(targets => {
      return res.json(targets);
    }, err => {
      return res.status(400).json({err: err});
    });
  });

  /**
   * Store an element.
   */
  router.post('/targets', (req: Request, res: Response) => {
    targetRepo.store({
      name: req.body.name,
      commands: req.body.commands
    }).then(target => {
      return res.json(target);
    }, err => {
      return res.status(400).json({err: err});
    });
  });

  /**
   * Pull a target and executes related commands.
   */
  router.post('/targets/pull/:slug', webHook.handle.bind(webHook),
    (req: Request, res: Response) => {
      const slug = req.params.slug;

      // default data for all logs
      let data: LogInterface = {
        ip: req.connection.remoteAddress,
        headers: req.headers,
        status: false,
        iteration: 0
      };

      targetRepo.getBySlug(slug).then(target => {
        if (!target) {
          data.status = false;
          let message = {
            message: 'Target not found',
            target: slug
          };
          data.results = [message];

          // if no target is found, then we just
          // respond with the status already made
          return logRepo.store(data).then(() => {
            res.json({success: false, message: message.message, target: message.target});
          }, err => {
            console.log(err);

            res.status(500).json({
              success: false,
              message: 'Unknown server error, cant save new Log.'
            });
          });
        }

        // if there is a target, we just respond success
        data.target = target._id;
        res.json({success: true});

        // we need to iterate the commands at least 5 times if they fail.
        const iterate = function (i = 0) {
          if (i >= 5) {
            return;
          }

          // we have to execute the commands
          exec.run(target.commands).then(results => {
            // we have to check if any of the commands failed,
            // if so, we set the status to false
            data.status = !results.some(obj => {
              return obj.success === false;
            });
            data.results = results;
            data.iteration = i;

            return logRepo.store(data);
          }).then(() => {
            // if the execution failed, we have to try again one minute later.
            if (!data.status) {
              return setTimeout(() => {
                return iterate(++i);
              }, 6e4);
            }
          });
        };

        return iterate();
      }).catch(err => {
        // TODO: morgan
        console.log(err);
      });
    });
}
