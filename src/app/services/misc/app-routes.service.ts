import { Injectable } from '@angular/core';
import { AppRoute } from './AppRoute';
import { AppStringsService } from '../strings/app-strings.service';

@Injectable()
export class AppRoutesService {

  private routes: AppRoute[] = [
    {
      title: 'Login',
      name: 'Login',
      path: '/login',
      shortDesc: 'Login!'
    }
  ];

  constructor(private appStrings: AppStringsService) {
    let home = {
      title: this.appStrings.brand,
      name: this.appStrings.brand,
      path: '/',
      shortDesc: 'Deployer, it just works!'
    };
    this.routes.push(home);
  }

  public getRoutes(): AppRoute[] {
    return this.routes;
  }
}
