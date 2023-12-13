export interface SortState<RowData = unknown> {
  key?: keyof RowData;
  order?: "ASC" | "DESC";
  by?: (element: RowData) => number | string | null;
}
