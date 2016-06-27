import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertComponent, PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { NG_TABLE_DIRECTIVES, NgCellClickData } from 'ng2-table/ng2-table';
import { PaginationPagesInterface, ConfigInterface, ColumnsInterface } from './';

@Component({
  moduleId: module.id,
  selector: 'default-table',
  templateUrl: 'default-table.component.html',
  styleUrls: ['default-table.component.css'],
  directives: [PAGINATION_DIRECTIVES, NG_TABLE_DIRECTIVES, AlertComponent]
})
export class DefaultTableComponent {

  /**
   * This represents the headers of the table.
   *
   * @type {Array}
   */
  @Input() public columns: ColumnsInterface[];

  /**
   * The result of manipulating the elements
   * passed from different components.
   *
   * @type {Array}
   */
  public rows: Array<any> = [];

  /**
   * Current pagination page.
   *
   * @type {number}
   */
  public page: number = 1;

  /**
   * The total number of items per page.
   *
   * @type {number}
   */
  public itemsPerPage: number = 10;

  /**
   * Controls the number set available to click in the paginator.
   *
   * @type {number}
   */
  public maxSize: number = 5;

  /**
   *
   * @type {number}
   */
  public numPages: number = 5;

  /**
   * The length of the current elements.
   *
   * @type {number}
   */
  public length: number = 0;

  @Output() public cellClicked: EventEmitter<any> = new EventEmitter();

  /**
   * The data to be displayed in the table.
   *
   * @type {Array}
   */
  private data: Array<{}> = [];

  /**
   * Used to store the filtered data according to the pagination.
   *
   * @type {Array}
   */
  private updatedData: Array<{}> = [];

  /**
   * The default config.
   *
   * @type {ConfigInterface}
   */
  private config: ConfigInterface = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: '', columnName: 'updatedAt'}
  };

  @Input()
  public set elements(data) {
    this.data = data || [];
    this.onChangeTable();
  }

  /**
   * Passes the cell click event to the parent component.
   *
   * @param {NgCellClickData} data
   */
  public passCellClickedEvent(data: NgCellClickData<any>): void {
    this.cellClicked.emit(data);
  }

  /**
   * Changes the page according to the sent page and data.
   *
   * @param {PaginationPagesInterface} page
   * @returns {any[]}
   */
  public changePage(page: PaginationPagesInterface): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : this.updatedData.length;

    return this.updatedData.slice(start, end);
  }

  /**
   * Changes the table according to the page event.
   *
   * @param {PaginationPagesInterface} page
   */
  public onChangeTable(page: PaginationPagesInterface = {
    page: this.page,
    itemsPerPage: this.itemsPerPage
  }): void {
    this.changeFilter();
    this.changeSort();
    this.rows = page && this.config.paging ?
      this.changePage(page) : this.updatedData;
    this.length = this.updatedData.length;
  }

  private changeSort(): void {
    if (!this.config.sorting || !this.updatedData) {
      return;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return;
    }

    // simple sorting
    this.updatedData = this.updatedData.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  private changeFilter(): void {
    if (!this.config.filtering || !this.data) {
      this.updatedData = this.data;
      return;
    }

    this.updatedData = this.data.filter((item: any) =>
      item[this.config.filtering.columnName].match(this.config.filtering.filterString));
  }
}
