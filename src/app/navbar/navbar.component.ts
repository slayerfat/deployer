import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppStringsService, AppRoutesService, AppRoute } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AppRoutesService]
})
export class NavbarComponent {

  public homeLink: AppRoute;
  public loginLink: AppRoute;
  public logsLink: AppRoute;

  constructor(public appStrings: AppStringsService, public appRoutes: AppRoutesService) {
    this.homeLink = this.appRoutes.getRoutes()
      .find(route => route.title === this.appStrings.brand);

    this.loginLink = this.appRoutes.getRoutes()
      .find(route => route.name === 'Login');

    this.logsLink = this.appRoutes.getRoutes()
      .find(route => route.name === 'Logs');
  }

  public setNormalFonts() {
    // TODO set fonts to normal
    console.log('normal fonts to be set');
  }

  public setLargeFonts() {
    // TODO set fonts to large
    console.log('large fonts to be set');
  }
}
