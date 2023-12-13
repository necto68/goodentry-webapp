import type { Column } from "../types/Column";

export const renderCellContent = <RowData extends object>(
  row: RowData | undefined,
  column: Column<RowData>
) => {
  if (!row) {
    return "-";
  }

  if (column.render) {
    return column.render(row);
  }

  if (column.key) {
    return String(row[column.key]);
  }

  return null;
};
