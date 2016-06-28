import { RouterConfig } from '@angular/router';
import { LogsComponent } from './logs.component';
import { DetailsComponent } from './shared/+details/details.component';
import { ListComponent } from './shared/+list/list.component';
// import { LogsComponent, DetailsComponent, ListComponent } from './';

export const LogRoutes: RouterConfig = [
  {
    path: 'logs',
    component: LogsComponent,
    children: [
      {path: ':id', component: DetailsComponent},
      {path: '', component: ListComponent}
    ]
  }
];
