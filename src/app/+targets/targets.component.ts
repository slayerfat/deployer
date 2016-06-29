import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TargetService } from '../shared';

@Component({
  moduleId: module.id,
  templateUrl: 'targets.component.html',
  styleUrls: ['targets.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [TargetService]
})
export class TargetsComponent {
  //
}
