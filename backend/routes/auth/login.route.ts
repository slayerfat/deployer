import { Request, Response } from 'express';
import User from '../../models/users/User';
import * as jwt from 'jsonwebtoken';
import { Comprobable } from '../../../src/app/shared/interfaces';
import { UserModelInterface } from '../../models/users/UserModelInterface';
import { JsonErrorResponse } from '../interfaces/JsonErrorResponse';
import { reporter } from '../../services/reporter/singleton';

export default function loginRoute(app, router) {
  router.post('/login', function (req: Request, res: Response) {
    const message: JsonErrorResponse = {success: false, message: 'Authentication failed.'};

    User.findOne({name: req.body.name}).exec().then((user: UserModelInterface) => {
      if (!user || user.password !== req.body.password) {
        return Promise.resolve(res.json(message));
      }

      // creates the jwt toke with a 6 hours duration
      // since jwt typing states sign returns void, we have
      // to assert the return as any (string doesn't work)
      let token = jwt.sign(user, app.get('jwtSecret'), {
        expiresIn: '6h'
      }) as any;

      let response: Comprobable = {success: true, token: token};

      // returns the token with a success message
      return Promise.resolve(res.json(response));
    }, err => {
      // TODO: morgan
      reporter.handleError(err);

      return Promise.resolve(res.status(400).json(message));
    });
  });
}
