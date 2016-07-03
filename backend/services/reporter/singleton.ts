import { Reporter, RollbarService } from './';
import { config } from '../../../config/config';
let rollbar = require('rollbar');

// http://i0.kym-cdn.com/photos/images/original/000/234/765/b7e.jpg
// make a reporter instance and exports it.
const rollbarService = new RollbarService({
  service: rollbar,
  token: config.rollbar.serverSecret,
  rollbarOptions: {environment: config.rollbar.environment}
});
const reporter = new Reporter(rollbarService);

export { reporter };
