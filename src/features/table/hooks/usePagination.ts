import { useEffect, useState } from "react";

export const usePagination = <RowData>(rows: RowData[], limit: number) => {
  const [paginatedData, setPaginatedData] = useState<(RowData | undefined)[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (direction: -1 | 1) => {
    if (
      (limit &&
        currentPage === Math.ceil(rows.length / limit) - 1 &&
        direction === 1) ||
      (currentPage === 0 && direction === -1)
    ) {
      return;
    }
    setCurrentPage((previous) => previous + direction);
  };

  useEffect(() => {
    if (limit) {
      setPaginatedData(
        rows.slice(currentPage * limit, (currentPage + 1) * limit)
      );
    }
  }, [currentPage, limit, rows]);

  useEffect(() => {
    setCurrentPage(0);
  }, [rows]);

  return { paginatedData, handlePageChange };
};
