import * as winston from 'winston';
import { config } from '../../config/config';
import path = require('path');

// https://github.com/winstonjs/winston/blob/master/docs/transports.md
winston.remove(winston.transports.Console)
  .add(winston.transports.Console, {
    colorize: true
  })
  .add(require('winston-daily-rotate-file'), {
    filename: `${path.resolve('logs/')}/winston.log`,
    handleExceptions: config.env === 'production' ? true : false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  });

export { winston }
