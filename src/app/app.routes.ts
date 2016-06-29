import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './+login';
import { DashboardComponent } from './+dashboard';
import { HomeComponent } from './+home';
import { LogRoutes } from './+logs';
import { TargetRoutes } from './+targets';

export const routes: RouterConfig = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  ...LogRoutes,
  ...TargetRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
