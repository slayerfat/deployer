import { Injectable } from '@angular/core';
import { AppRoute } from './AppRoute';
import { AppStringsService } from './app-strings.service';

@Injectable()
export class AppRoutesService {

  private routes: AppRoute[] = [
    {
      title: 'Login',
      name: 'Login',
      path: 'login',
      shortDesc: 'Login!'
    },
    {
      title: 'Logs',
      name: 'Logs',
      path: 'logs',
      shortDesc: 'See the system logs.'
    },
    {
      title: 'Targets',
      name: 'Targets',
      path: 'targets',
      shortDesc: 'See the system targets.'
    }
  ];

  constructor(private appStrings: AppStringsService) {
    let home = {
      title: this.appStrings.brand,
      name: this.appStrings.brand,
      path: '',
      shortDesc: this.appStrings.shortDesc
    };
    this.routes.push(home);
  }

  public getRoutes(): AppRoute[] {
    return this.routes;
  }
}
