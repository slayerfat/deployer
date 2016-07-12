import { Component, OnInit } from '@angular/core';
import { LogService } from '../shared/services/log/log.service';
import { LogInterface } from '../shared/interfaces/models/LogInterface';
import { HumanDiff } from '../shared/pipes/human-diff.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [LogService],
  pipes: [HumanDiff]
})
export class DashboardComponent implements OnInit {

  private logs: LogInterface[];

  constructor(private logsService: LogService) {
  }

  public ngOnInit(): any {
    return this.logsService.getLatest().subscribe(logs => {
      this.logs = logs;
    });
  }

  public setStatusClasses(status) {
    return {
      'fa-times-circle-o': !status,
      'text-danger': !status,
      'fa-check-circle-o': status,
      'text-success': status,
    };
  }
}
