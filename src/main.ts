import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { DeployerAppComponent, environment } from './app/';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrap(DeployerAppComponent, [
  ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})
]);

