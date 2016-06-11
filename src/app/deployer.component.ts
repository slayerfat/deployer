import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { AppStringsService } from './services/strings/app-strings.service';
import { AuthUserService } from './services/user/auth-user.service';
import { LoginComponent } from './+login';
import { DashboardComponent } from './+dashboard';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './+home';

@Component({
  moduleId: module.id,
  selector: 'deployer-app',
  templateUrl: 'deployer.component.html',
  styleUrls: ['deployer.component.css'],
  directives: [ROUTER_DIRECTIVES, NavbarComponent],
  providers: [ROUTER_PROVIDERS, AuthUserService, AppStringsService]
})
@Routes([
  {path: '/', component: HomeComponent},
  {path: '/home', component: HomeComponent},
  {path: '/login', component: LoginComponent},
  {path: '/dashboard', component: DashboardComponent}
])
export class DeployerAppComponent {
}
