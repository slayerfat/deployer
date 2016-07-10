import { RouterConfig } from '@angular/router';
import { LogsComponent } from './logs.component';
import { DetailsComponent } from './shared/+details/details.component';
import { ListComponent } from './shared/+list/list.component';
import { AuthGuardService } from '../shared/services/misc/auth-guard.service';

export const LogRoutes: RouterConfig = [
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: ':id', component: DetailsComponent},
      {path: '', component: ListComponent}
    ]
  }
];
