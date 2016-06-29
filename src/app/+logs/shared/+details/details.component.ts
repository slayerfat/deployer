import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService, LogInterface, HumanDiff } from '../../../shared';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.css'],
  directives: [TAB_DIRECTIVES],
  pipes: [HumanDiff]
})
export class DetailsComponent implements OnInit, OnDestroy {

  public log: LogInterface;
  private sub: any;

  constructor(private route: ActivatedRoute, private logService: LogService) {
  }

  // noinspection JSUnusedGlobalSymbols
  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.logService.getOne(params['id']).subscribe(res => this.log = res);
    });
  }

  // noinspection JSUnusedGlobalSymbols
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public setStatusIconClasses(status?: any) {
    status = status || this.log.status;

    return {
      'fa-times-circle-o': !status,
      'text-danger': !status,
      'fa-check-circle-o': status,
      'text-success': status,
    };
  }
}
