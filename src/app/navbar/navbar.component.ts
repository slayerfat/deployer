import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppStringsService } from '../services/strings/app-strings.service';
import { AppRoutesService } from '../services/misc/app-routes.service';
import { AppRoute } from '../services/misc/AppRoute';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AppRoutesService]
})
export class NavbarComponent implements OnInit {

  homeLink: AppRoute;
  loginLink: AppRoute;

  constructor(public appStrings: AppStringsService, public appRoutes: AppRoutesService) {
    this.homeLink = this.appRoutes.getRoutes()
      .find(route => route.title == this.appStrings.brand);

    this.loginLink = this.appRoutes.getRoutes()
      .find(route => route.name == 'Login');
  }

  ngOnInit() {
  }
}
