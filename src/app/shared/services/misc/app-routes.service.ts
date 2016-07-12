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
      nav: '/login',
      shortDesc: 'Login!'
    },
    {
      title: 'Logout',
      name: 'Logout',
      path: 'logout',
      nav: '/logout',
      shortDesc: 'Logout'
    },
    {
      title: 'Logs',
      name: 'Logs',
      path: 'logs',
      nav: '/logs',
      shortDesc: 'See the system logs.'
    },
    {
      title: 'Targets',
      name: 'Targets',
      path: 'targets',
      nav: '/targets',
      shortDesc: 'See the system targets.'
    },
    {
      title: 'Dashboard',
      name: 'Dashboard',
      path: 'dashboard',
      nav: '/dashboard',
      shortDesc: 'See your dashboard!'
    }
  ];

  constructor(private appStrings: AppStringsService) {
    let home = {
      title: this.appStrings.brand,
      name: this.appStrings.brand,
      path: '',
      nav: '/',
      shortDesc: this.appStrings.shortDesc
    };
    this.routes.push(home);
  }

  public getRoutes(): AppRoute[] {
    return this.routes;
  }

  public find(name: string, attr = 'name'): AppRoute {
    return this.routes.find(route => route[attr] === name);
  }
}
