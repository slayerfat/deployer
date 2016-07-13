import { config } from '../config/config';
import { reporter } from './services/reporter/singleton';
import { winston } from './services/winston';

export default (mongoose) => {
  return new Promise((resolve, reject) => {
    let url: string;
    let options: Object;

    if (config.env === 'development') {
      url = config.mongo.development;
      options = {config: {autoIndex: true}};
    } else {
      winston.info(`Database autoIndex config set to false.`);
      options = {config: {autoIndex: false}};
      url = config.mongo.production;
    }

    // Set to any Promise implementation
    mongoose.Promise = Promise;

    mongoose.connection.on('connected', () => {
      winston.info(`Connected to ${config.env} database.`);
    });

    // If the connection throws an error
    mongoose.connection.on('error', (err) => {
      winston.error(`Unable to connect to ${config.env} database`, err.message);
      reporter.handleError(err);

      reject(err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      winston.info(`Disconnected from ${config.env} database.`);
    });

    let exit = function () {
      mongoose.connection.close(() => {
        winston.info(`Database ${config.env} disconnected thanks to node.`);

        process.exit(0);
      });
    };

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', exit).on('SIGTERM', exit);

    mongoose.connect(url, options, (error) => {
      if (error) {
        const conRef = 'connect ECONNREFUSED 127.0.0.1:27017';

        winston.error(error.message);

        if (config.env === 'development' && error.message === conRef) {
          return reject(error);
        }

        reporter.handleError(error);

        return reject(error);
      }

      return resolve();
    });
  });
};
