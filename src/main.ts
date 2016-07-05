// importing rollbar first to catch any ng2 errors
import { rollbar } from './app/resources/ts/rollbar';
rollbar();

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { APP_PROVIDERS } from './app/app.providers';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_PROVIDERS,
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS
]).catch(err => Rollbar.error('couldn\'t bootstrap angular!', err));

