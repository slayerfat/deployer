import { RouterConfig } from '@angular/router';
import { TargetsComponent } from './targets.component';
import { TargetsDetailsComponent, TargetsListComponent } from './shared';

export const TargetRoutes: RouterConfig = [
  {
    path: 'targets',
    component: TargetsComponent,
    children: [
      {path: ':id', component: TargetsDetailsComponent},
      {path: '', component: TargetsListComponent}
    ]
  }
];
