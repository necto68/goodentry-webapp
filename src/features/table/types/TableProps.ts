import type { Column } from "./Column";

export interface TableProps<RowData> {
  columns: Column<RowData>[];
  rows: (RowData | undefined)[];
  getRowKey?: (row: RowData) => string;
  filterInputValue?: string;
  onRowClick?: (row: RowData) => void;
}
