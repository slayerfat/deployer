import { Request, Response } from 'express';
import User from '../../models/users/User';
import * as jwt from 'jsonwebtoken';

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
        console.log('user found');
        // check if password matches
        if (user.password != req.body.password) {
          res.json(message);
        } else {
          // if user is found and password is right
          // create a token
          let token = jwt.sign(user, app.get('jwtSecret'), {
            expiresIn: '6h'
          });

          // return the information including token as JSON
          res.json({success: true, token: token});
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
