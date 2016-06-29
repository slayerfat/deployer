import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertComponent, PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { NG_TABLE_DIRECTIVES, NgCellClickData } from 'ng2-table/ng2-table';
import {
  TargetService,
  DefaultTableComponent,
  TargetInterface,
  ColumnsInterface
} from '../../../shared/';

@Component({
  moduleId: module.id,
  templateUrl: 'targets-list.component.html',
  styleUrls: ['targets-list.component.css'],
  directives: [
    PAGINATION_DIRECTIVES,
    NG_TABLE_DIRECTIVES,
    AlertComponent,
    DefaultTableComponent
  ]
})
export class TargetsListComponent implements OnInit {
  public columns: Array<ColumnsInterface> = [
    {title: 'Ip', name: 'ip', sort: 'asc'},
    {title: 'Status', name: 'status'},
    {title: 'Created at', name: 'createdAt'},
    {title: 'Updated at', name: 'updatedAt', sort: 'asc'},
  ];
  public length: number = 0;
  public data: TargetInterface[];

  public constructor(private targetService: TargetService, private router: Router) {
  }

  // noinspection JSUnusedGlobalSymbols
  public ngOnInit(): void {
    this.targetService.getAll().subscribe((results: any) => {
      this.data = results;
      this.length = this.data.length;
    });
  }

  /**
   * Send the user to the Log details component with the related id.
   *
   * @param {NgCellClickData} data
   */
  public sendToDetails(data: NgCellClickData<{_id: any}>) {
    this.router.navigate(['/targets', data.row._id]);
  }
}
