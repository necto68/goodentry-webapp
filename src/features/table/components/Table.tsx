import {
  TableContainer,
  Table as TableRoot,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

import { renderCellContent } from "../helpers/renderCellContent";
import { useFilteredBy } from "../hooks/useFilterBy";
import { useSortBy } from "../hooks/useSortBy";

import { Header } from "./Header";

import type { TableProps } from "../types/TableProps";

export const Table = <RowData extends object>({
  columns,
  rows,
  getRowKey,
  filterInputValue,
}: TableProps<RowData>) => {
  const { filteredRows } = useFilteredBy(columns, rows, filterInputValue);
  const { sortedRows } = useSortBy(filteredRows);

  return (
    <TableContainer w="full">
      <TableRoot size="sm" variant="unstyled">
        <Thead>
          <Tr>
            {columns.map(({ title, key }, columnIndex) => (
              <Th
                key={`${String(key)}${columnIndex.toString()}`}
                textAlign={
                  columnIndex === columns.length - 1 ? "right" : "left"
                }
              >
                {title ? <Header title={title} /> : null}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedRows.map((row, rowIndex) => (
            <Tr key={row && getRowKey ? getRowKey(row) : rowIndex}>
              {columns.map((column, columnIndex) => (
                <Td
                  key={column.key?.toString() ?? columnIndex.toString()}
                  textAlign={
                    columnIndex === columns.length - 1 ? "right" : "left"
                  }
                >
                  {renderCellContent(row, column)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </TableRoot>
    </TableContainer>
  );
};
