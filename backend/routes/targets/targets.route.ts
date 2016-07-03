import { TargetRepository } from '../../repositories/TargetRepository';
import { JsonErrorResponse } from '../interfaces/JsonErrorResponse';
import { LogRepository } from '../../repositories/LogRepository';
import { LogInterface } from '../../models/logs/LogInterface';
import { reporter } from '../../services/reporter/singleton';
import { ExecService } from '../../services/ExecService';
import { WebHooks } from '../middlewares/WebHooks';
import { winston } from '../../services/winston';
import { Request, Response } from 'express';

// TODO: jwt
// import * as jwt from 'jsonwebtoken';

export default function targetRoute(app, router) {
  // TODO: IOC
  const targetRepo = new TargetRepository();
  const logRepo = new LogRepository();
  const exec = new ExecService();
  const webHook = new WebHooks();
  let msg: JsonErrorResponse;

  /**
   * Gets a list of elements.
   */
  router.get('/targets', (req: Request, res: Response) => {
    targetRepo.getAll().then(targets => {
      return res.json(targets);
    }, err => {
      msg = {message: err.message};
      return res.status(400).json(msg);
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
      msg = {message: err.message};
      return res.status(400).json(msg);
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

      // we need to find the target by slug
      targetRepo.getBySlug(slug).then(target => {
        // if there is a target, we just respond success
        data.target = target._id;
        res.json({success: true});

        // we need to iterate the commands at least 5 times if they fail.
        const iterate = function (i = 0) {
          if (i >= 5) {
            return;
          }

          winston.debug(`trying to iterate exec at target, iteration ${i}`);

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
      }).catch(error => {
        // we need to inform the reporter service because this is a critical business case
        const errMsg = `Target failed to pull: ${error.message}`;
        reporter.log(errMsg, 'warning', req);
        winston.warn(errMsg, JSON.stringify(data));

        // sets the response fail status flag
        data.status = false;

        // this data goes into the log at mongo and the server response.
        let message = {
          message: error.message,
          target: slug
        };
        data.results = [message];

        // if no target is found, then we just
        // respond with the status already made
        return logRepo.store(data).then(() => {
          res.json({success: false, message: message.message, target: message.target});
        }, () => {
          res.status(500).json({
            success: false,
            message: 'Unknown server error, cant save new Log.'
          });
        });
      });
    });

  router.post('/targets/find', (req: Request, res: Response) => {
    targetRepo.getOne(req.body.id).then(target => {
      return res.json(target);
    }, err => {
      msg = {message: err.message};
      return res.status(400).json(msg);
    });
  });

  router.post('/targets/find/slug', (req: Request, res: Response) => {
    targetRepo.getBySlug(req.body.slug).then(target => {
      return res.json(target);
    }, err => {
      msg = {message: err.message};
      return res.status(400).json(msg);
    });
  });
}
