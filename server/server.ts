import { Request, Response } from 'express';
import express = require('express');
import path = require('path');
import loginRoute from './routes/auth/login.route';

const rootDir = path.resolve('dist/');
const indexFile = path.resolve('dist/index.html');

let app = express();

app.use(express.static(rootDir));

app.get('/*', function (req: Request, res: Response) {
  res.sendFile(indexFile);
});

loginRoute(app);

// noinspection MagicNumberJS
app.listen(3300, function () {
  console.log('Serving http://localhost:3300!');
});
