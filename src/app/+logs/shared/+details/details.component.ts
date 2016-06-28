import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService, LogInterface } from '../../../shared';

@Component({
  moduleId: module.id,
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.css']
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
}
