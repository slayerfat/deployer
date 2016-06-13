import { Request, Response } from 'express';
import express = require('express');
import path = require('path');
import loginRoute from './routes/auth/login.route';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import config from '../config/config';
import * as mongoose from 'mongoose';
import db from './database';

const rootDir = path.resolve('dist/');
const indexFile = path.resolve('dist/index.html');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(rootDir));
app.set('jwtSecret', config.jwtSecret);

db(mongoose);

if (config.env == 'development') {
  // use morgan to log requests to the console
  // noinspection TypeScriptValidateTypes
  app.use(morgan('dev'));
}

app.get('/*', function (req: Request, res: Response) {
  res.sendFile(indexFile);
});

loginRoute(app);

// noinspection MagicNumberJS
app.listen(3300, function () {
  console.log('Serving http://localhost:3300!');
});
