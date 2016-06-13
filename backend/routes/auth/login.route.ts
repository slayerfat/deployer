import { Request, Response } from 'express';
import User from '../../models/users/User';
import * as jwt from 'jsonwebtoken';
import { Comprobable } from '../../../src/app/shared/interfaces';

export default function loginRoute(app) {
  app.post('/api/login', function (req: Request, res: Response) {
    User.findOne({name: req.body.name}, function (err, user) {
      if (err) {
        return console.log(err);
      }

      const message = {success: false, message: 'Authentication failed.'};

      if (!user) {
        return res.json(message);
      } else if (user) {
        // check if password matches
        if (user.password != req.body.password) {
          res.json(message);
        } else {
          // creates the jwt toke with a 6 hours duration
          // since jwt typing states sign returns void, we have
          // to assert the return as any (string doesn't work)
          let token = jwt.sign(user, app.get('jwtSecret'), {
            expiresIn: '6h'
          }) as any;

          let response: Comprobable = {success: true, token: token};

          // returns the token with a success message
          res.json(response);
        }
      }
    });
  });

  app.post('/api/seed', function (req, res) {
    // create a sample user
    let user = new User({
      name: 'asd',
      password: 'asd',
      email: 'a@a',
      control: {
        dates: {
          created_at: null,
          updated_at: null
        },
        user: {
          created_by: 1,
          updated_by: 1
        }
      }
    });

    // save the sample user
    user.save(function (err) {
      if (err) {
        console.log(err);
      }

      console.log('User saved successfully.');
      res.json({success: true});
    });
  });
}
