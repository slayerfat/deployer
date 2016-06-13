import express = require('express');
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import config from '../config/config';
import * as mongoose from 'mongoose';
import db from './database';
import loginRoute from './routes/auth/login.route';
import frontEndRoutes from './routes/frontend';

// server default port
const port = config.env == 'development' ?
  config.ports.backend : config.ports.frontend;

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('jwtSecret', config.jwtSecret);

db(mongoose);

if (config.env == 'development') {
  // use morgan to log requests to the console
  // noinspection TypeScriptValidateTypes
  app.use(morgan('dev'));
}

if (config.env == 'production') {
  frontEndRoutes(app);
}

loginRoute(app);

app.listen(port, function () {
  console.log(`The backend is serving on port ${port}.`);
});
