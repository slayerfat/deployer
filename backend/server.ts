import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { config } from '../config/config';
import * as mongoose from 'mongoose';
import db from './database';
import loginRoute from './routes/auth/login.route';
import targetRoute from './routes/targets/targets.route';
import logRoute from './routes/logs/logs.route';
import frontEndRoutes from './routes/frontend';
import { accessLogStream } from './services/morganFileStream';
let rollbar = require('rollbar');

// TODO: IOC
// https://www.npmjs.com/package/typescript-ioc
// http://stackoverflow.com/questions/12795666/ioc-for-typescript
// http://inversify.io/

// server default port
const port = config.env === 'development' ?
  config.ports.backend : config.ports.frontend;

let app = express();
let router = express.Router();

// cross origin requests
app.use(cors({origin: config.url}));

// parsers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// jwt secret (stored in app)
app.set('jwtSecret', config.jwtSecret);

// database initiation
db(mongoose);

if (config.env === 'development') {
  // use morgan to log requests to the console
  // noinspection TypeScriptValidateTypes
  app.use(morgan('dev'));
}

// noinspection TypeScriptValidateTypes
app.use(morgan('combined', {stream: accessLogStream}));

// backend routes
if (config.env === 'production') {
  frontEndRoutes(app);
}

loginRoute(app, router);
targetRoute(app, router);
logRoute(app, router);

// routes are be prefixed with /api
app.use('/api', router);

// Use the rollbar error handler to send exceptions to your rollbar account
app.use(rollbar.errorHandler(config.rollbar.serverSecret, {environment: config.rollbar.environment}));

app.listen(port, function () {
  console.log(`The backend is serving on port ${port}.`);
});
