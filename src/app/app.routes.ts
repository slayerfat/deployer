import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './+login';
import { LogoutComponent } from './+logout';
import { DashboardComponent } from './+dashboard';
import { HomeComponent } from './+home';
import { NotFoundComponent } from './+not-found';
import { LogRoutes } from './+logs';
import { TargetRoutes } from './+targets';
import { LoggedInGuardService } from './shared/services/misc/logged-in-guard.service';
import { AuthGuardService } from './shared/services/misc/auth-guard.service';

export const routes: RouterConfig = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoggedInGuardService]},
  {path: 'logout', component: LogoutComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  ...LogRoutes,
  ...TargetRoutes,
  {path: '**', component: NotFoundComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
