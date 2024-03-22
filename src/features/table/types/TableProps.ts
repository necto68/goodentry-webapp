import type { Column } from "./Column";

export interface TableProps<RowData> {
  columns: Column<RowData>[];
  limit?: number;
  rows: (RowData | undefined)[];
  getRowKey?: (row: RowData) => string;
  filterInputValue?: string;
  onRowClick?: (row: RowData) => void;
}
