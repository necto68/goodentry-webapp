import {
  TableContainer,
  Table as TableRoot,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { Paginator } from "../../protected-perps-page/styles/HistoryTable";
import { Subtitle } from "../../referral-page/styles/ReferralHistoryTable";
import { renderCellContent } from "../helpers/renderCellContent";
import { useFilteredBy } from "../hooks/useFilterBy";
import { usePagination } from "../hooks/usePagination";
import { useSortBy } from "../hooks/useSortBy";

import { Header } from "./Header";

import type { TableProps } from "../types/TableProps";

export const Table = <RowData extends object>({
  columns,
  rows,
  getRowKey,
  filterInputValue,
  limit,
}: TableProps<RowData>) => {
  const { filteredRows } = useFilteredBy(columns, rows, filterInputValue);
  const { sortedRows } = useSortBy(filteredRows);
  const { paginatedData, handlePageChange } = usePagination(
    sortedRows,
    limit ?? 0
  );

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
          {(limit ? paginatedData : sortedRows).map((row, rowIndex) => (
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
      {sortedRows.length === 0 ? <Subtitle>No records</Subtitle> : null}
      {limit ? (
        <Paginator>
          <Button
            onClick={() => {
              handlePageChange(-1);
            }}
            variant="unstyled"
          >
            <BsChevronLeft color="gray" />
          </Button>
          <Button
            onClick={() => {
              handlePageChange(1);
            }}
            variant="unstyled"
          >
            <BsChevronRight color="gray" />
          </Button>
        </Paginator>
      ) : null}
    </TableContainer>
  );
};
