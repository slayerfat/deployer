import { Component, OnInit } from '@angular/core';
import { LogService, DefaultTableComponent, LogInterface } from '../../../shared/';
import { AlertComponent, PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { NG_TABLE_DIRECTIVES } from 'ng2-table/ng2-table';
import { ColumnsInterface } from '../../../shared/components/default-table/';

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

  public constructor(private logService: LogService) {
  }

  public ngOnInit(): void {
    this.logService.index().subscribe((results: any) => {
      this.data = results;
      this.length = this.data.length;
    });
  }
}
