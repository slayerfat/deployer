// rollbar global config, set from index script tag
import { environment } from '../../environment';

declare var _rollbarConfig: any;
declare var System: any;

_rollbarConfig = {
  accessToken: environment.rollbar.secret,
  captureUncaught: true,
  payload: {
    environment: environment.rollbar.environment
  }
};

export function rollbar() {
  // noinspection TypeScriptUnresolvedFunction, JSFileReferences
  System.import('vendor/rollbar/dist/rollbar.snippet.js').then(function () {
    if (!environment.production) {
      console.log('Rollbar v2 starting.');
    }
  });
}
