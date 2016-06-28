import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LogService } from '../shared/services/log/log.service';

@Component({
  moduleId: module.id,
  selector: 'app-logs',
  templateUrl: 'logs.component.html',
  styleUrls: ['logs.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [LogService]
})
export class LogsComponent {

  constructor() {
  }
}
