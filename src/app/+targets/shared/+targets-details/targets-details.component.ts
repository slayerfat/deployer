import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TargetService, TargetInterface, HumanDiff } from '../../../shared';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  templateUrl: 'targets-details.component.html',
  styleUrls: ['targets-details.component.css'],
  directives: [TAB_DIRECTIVES],
  pipes: [HumanDiff]
})
export class TargetsDetailsComponent implements OnInit, OnDestroy {

  public target: TargetInterface;
  private sub: any;

  constructor(private route: ActivatedRoute, private targetService: TargetService) {
  }

  // noinspection JSUnusedGlobalSymbols
  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.targetService.getOne(params['id']).subscribe(res => this.target = res);
    });
  }

  // noinspection JSUnusedGlobalSymbols
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
