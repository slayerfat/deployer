import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {
  AppStringsService,
  AppRoutesService,
  AppRoute,
  UserAuthService
} from '../../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit, OnDestroy {

  public homeLink: AppRoute;
  public loginLink: AppRoute;
  public logsLink: AppRoute;
  public targetsLink: AppRoute;
  public logoutLink: AppRoute;
  public dashboardLink: AppRoute;
  public isUserLogged = UserAuthService.isLogged;
  private loggedSub;

  constructor(public appStrings: AppStringsService,
    public appRoutes: AppRoutesService,
    private userAuthService: UserAuthService) {
    this.homeLink = this.appRoutes.find(this.appStrings.brand, 'title');
    this.loginLink = this.appRoutes.find('Login');
    this.logsLink = this.appRoutes.find('Logs');
    this.targetsLink = this.appRoutes.find('Targets');
    this.logoutLink = this.appRoutes.find('Logout');
    this.dashboardLink = this.appRoutes.find('Dashboard');
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
