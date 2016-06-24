import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { DetailsComponent } from './shared/+details/details.component';

@Component({
  moduleId: module.id,
  selector: 'app-logs',
  templateUrl: 'logs.component.html',
  styleUrls: ['logs.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/details', component: DetailsComponent}
])
export class LogsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
