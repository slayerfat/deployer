import { ColumnsInterface } from './ColumnsInterface';

export interface ConfigInterface {
  paging: boolean;
  sorting: {columns: ColumnsInterface[]};
  filtering: {filterString: string, columnName: string};
}
