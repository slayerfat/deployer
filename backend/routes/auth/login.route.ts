import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../../models/users/User';
import { Request, Response } from 'express';
import { winston } from '../../services/winston';
import { reporter } from '../../services/reporter/singleton';
import { Comprobable } from '../../../src/app/shared/interfaces';
import { JsonErrorResponse } from '../interfaces/JsonErrorResponse';
import { UserModelInterface } from '../../models/users/UserModelInterface';

export default function loginRoute(app, router) {
  router.post('/login', function (req: Request, res: Response) {
    const message: JsonErrorResponse = {success: false, message: 'Authentication failed.'};

    User.findOne({name: req.body.name}).exec().then((user: UserModelInterface) => {
      if (!(user && bcrypt.compareSync(req.body.password, user.password))) {
        return Promise.resolve(res.json(message));
      }

      // creates the jwt toke with a 6 hours duration
      // since jwt typing states sign returns void, we have
      // to assert the return as any (string doesn't work)
      let token = jwt.sign({name: user.name}, app.get('jwtSecret'), {
        expiresIn: '6h'
      }) as any;

      let response: Comprobable = {success: true, token: token};

      // returns the token with a success message
      return Promise.resolve(res.json(response));
    }, err => {
      winston.error('Couldn\'t find user at login.', err.message);
      reporter.handleError(err);

      return Promise.resolve(res.status(400).json(message));
    });
  });

  router.get('/checkToken', function (req: Request, res: Response) {
    res.json({success: true});
  });
}
