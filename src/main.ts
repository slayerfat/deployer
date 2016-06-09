import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { DeployerAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(DeployerAppComponent);

