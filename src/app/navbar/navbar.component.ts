import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {
  AppStringsService,
  AppRoutesService,
  AppRoute,
  UserAuthService
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AppRoutesService]
})
export class NavbarComponent implements OnInit, OnDestroy {

  public homeLink: AppRoute;
  public loginLink: AppRoute;
  public logsLink: AppRoute;
  public targetsLink: AppRoute;
  public logoutLink: AppRoute;
  public isUserLogged = UserAuthService.isLogged;
  private loggedSub;

  constructor(public appStrings: AppStringsService,
    public appRoutes: AppRoutesService,
    private userAuthService: UserAuthService) {
    this.homeLink = this.appRoutes.getRoutes()
      .find(route => route.title === this.appStrings.brand);

    this.loginLink = this.appRoutes.getRoutes()
      .find(route => route.name === 'Login');

    this.logsLink = this.appRoutes.getRoutes()
      .find(route => route.name === 'Logs');

    this.targetsLink = this.appRoutes.getRoutes()
      .find(route => route.name === 'Targets');

    this.logoutLink = this.appRoutes.getRoutes()
      .find(route => route.name === 'Logout');
  }

  public ngOnInit(): any {
    this.loggedSub = this.userAuthService.isLoggedInObservable.subscribe(results => {
      this.isUserLogged = results;
    });
  }

  public ngOnDestroy(): any {
    this.loggedSub.unsubscribe();
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
