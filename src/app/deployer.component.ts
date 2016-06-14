import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { AppStringsService } from './shared/services/app-strings.service';
import { UserAuthService } from './shared';
import { NavbarComponent } from './navbar';
import { FooterComponent } from './footer';
import { LoginComponent } from './+login';
import { DashboardComponent } from './+dashboard';
import { HomeComponent } from './+home';

@Component({
  moduleId: module.id,
  selector: 'deployer-app',
  templateUrl: 'deployer.component.html',
  styleUrls: ['deployer.component.css'],
  directives: [ROUTER_DIRECTIVES, NavbarComponent, FooterComponent],
  providers: [ROUTER_PROVIDERS, UserAuthService, AppStringsService]
})
@Routes([
  {path: '/', component: HomeComponent},
  {path: '/home', component: HomeComponent},
  {path: '/login', component: LoginComponent},
  {path: '/dashboard', component: DashboardComponent}
])
export class DeployerAppComponent {
}
