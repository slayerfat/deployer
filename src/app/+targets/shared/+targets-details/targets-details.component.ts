import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TargetService, TargetInterface, HumanDiff } from '../../../shared';

@Component({
  moduleId: module.id,
  templateUrl: 'targets-details.component.html',
  styleUrls: ['targets-details.component.css'],
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
      this.targetService.getBySlug(params['id']).subscribe(res => this.target = res);
    });
  }

  // noinspection JSUnusedGlobalSymbols
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
