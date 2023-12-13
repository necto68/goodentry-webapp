export interface Column<RowData> {
  key?: keyof RowData;
  title?: string;
  sortBy?: (row: RowData) => number | string | null;
  filterBy?: true | ((row: RowData) => string[] | string);
  render?: (row: RowData) => JSX.Element | string;
}
