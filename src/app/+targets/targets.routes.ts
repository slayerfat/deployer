import { RouterConfig } from '@angular/router';
import { TargetsComponent } from './targets.component';
import { TargetsDetailsComponent, TargetsListComponent } from './shared';
import { AuthGuardService } from '../shared/services/misc/auth-guard.service';

export const TargetRoutes: RouterConfig = [
  {
    path: 'targets',
    component: TargetsComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: ':id', component: TargetsDetailsComponent},
      {path: '', component: TargetsListComponent}
    ]
  }
];
