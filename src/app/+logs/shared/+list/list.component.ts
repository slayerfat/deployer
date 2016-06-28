import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertComponent, PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { NG_TABLE_DIRECTIVES, NgCellClickData } from 'ng2-table/ng2-table';
import {
  LogService,
  DefaultTableComponent,
  LogInterface,
  ColumnsInterface
} from '../../../shared/';

@Component({
  moduleId: module.id,
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [
    PAGINATION_DIRECTIVES,
    NG_TABLE_DIRECTIVES,
    AlertComponent,
    DefaultTableComponent
  ],
})
export class ListComponent implements OnInit {
  public columns: Array<ColumnsInterface> = [
    {title: 'Ip', name: 'ip', sort: 'asc'},
    {title: 'Status', name: 'status'},
    {title: 'Created at', name: 'createdAt'},
    {title: 'Updated at', name: 'updatedAt', sort: 'asc'},
  ];
  public length: number = 0;
  public data: LogInterface[];

  public constructor(private logService: LogService, private router: Router) {
  }

  // noinspection JSUnusedGlobalSymbols
  public ngOnInit(): void {
    this.logService.getAll().subscribe((results: any) => {
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
    this.router.navigate(['/logs', data.row._id]);
  }
}
