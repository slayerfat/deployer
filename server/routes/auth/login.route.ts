import { Request, Response } from 'express';
import { User } from "../../models/users/User";

export default function loginRoute(app) {
  app.post('/api/login', function (req: Request, res: Response) {
    let results = User.find({
      email: req.body.email,
      password: req.body.password
    });
    return res.send(results);
  });
}
