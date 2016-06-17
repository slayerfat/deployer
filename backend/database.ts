import { config } from '../config/config';

export default (mongoose) => {
  let url: string;

  if (config.env == 'development') {
    url = config.mongo.development;
  } else {
    url = config.mongo.production;
  }

  // Set to any Promise implementation
  mongoose.Promise = Promise;

  mongoose.connect(url, (error) => {
    if (error) {
      throw error;
    }
  });

  mongoose.connection.on('connected', () => {
    console.log(`Connected to ${config.env} database.`);
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    console.error(`Unable to connect to ${config.env} database`, err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log(`Disconnected from ${config.env} database.`);
  });

  let exit = function () {
    mongoose.connection.close(() => {
      console.log(`Database ${config.env} disconnected thanks to node.`);

      process.exit(0);
    });
  };

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', exit).on('SIGTERM', exit);
};
