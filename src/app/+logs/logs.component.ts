import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { DetailsComponent } from './shared/+details/details.component';
import { LogService } from '../shared/';
import { ListComponent } from './shared/+list/list.component';

@Component({
  moduleId: module.id,
  selector: 'app-logs',
  templateUrl: 'logs.component.html',
  styleUrls: ['logs.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [LogService]
})
@Routes([
  {path: '/', component: ListComponent},
  {path: '/details/:id', component: DetailsComponent}
])
export class LogsComponent implements OnInit {

  constructor() {
  }

  public ngOnInit() {
  }
}
