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
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { Paginator } from "../../protected-perps-page/styles/HistoryTable";
import { Subtitle } from "../../referral-page/styles/ReferralHistoryTable";
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
  limit = 0,
}: TableProps<RowData>) => {
  const { filteredRows } = useFilteredBy(columns, rows, filterInputValue);
  const { sortedRows } = useSortBy(filteredRows);

  const [paginatedData, setPaginatedData] = useState<(RowData | undefined)[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      sortedRows &&
      currentPage === Math.ceil(sortedRows.length / limit) - 1
    ) {
      return;
    }
    setCurrentPage((previous) => previous + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 0) {
      return;
    }
    setCurrentPage((previous) => previous - 1);
  };

  useEffect(() => {
    setPaginatedData(
      sortedRows.slice(currentPage * limit, (currentPage + 1) * limit)
    );
  }, [currentPage, limit, sortedRows]);

  // eslint-disable-next-line sonarjs/no-identical-functions
  useEffect(() => {
    setPaginatedData(
      sortedRows.slice(currentPage * limit, (currentPage + 1) * limit)
    );
  }, [currentPage, limit, sortedRows]);

  useEffect(() => {
    setCurrentPage(0);
  }, [rows]);

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
          {(limit > 0 ? paginatedData : sortedRows).map((row, rowIndex) => (
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
      {limit > 0 && (
        <Paginator>
          <Button onClick={handlePreviousPage} variant="unstyled">
            <BsChevronLeft color="gray" />
          </Button>
          <Button onClick={handleNextPage} variant="unstyled">
            <BsChevronRight color="gray" />
          </Button>
        </Paginator>
      )}
    </TableContainer>
  );
};
