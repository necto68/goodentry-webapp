import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

import { TransactionType } from "../../queries/types/PositionsResponse";
import {
  getFormattedAmount,
  getFormattedCurrency,
  getFormattedDate,
} from "../../shared/helpers/baseFormatters";
import { getExplorerLink } from "../../web3/helpers/getExplorerLink";
import { ExplorerLinkType } from "../../web3/types/ExplorerLinkType";
import { useHistory } from "../hooks/useHistory";
import {
  Container,
  HistoryExplore,
  HistoryRow,
  HistoryText,
  Paginator,
} from "../styles/HistoryTable";

import type { PositionHistory } from "../../queries/types/PositionHistory";

const getFormattedTitle = (row: PositionHistory) => {
  let type = "Open";
  switch (row.type) {
    case TransactionType.OPEN_POSITION:
      type = "Open";
      break;
    case TransactionType.CLOSE_POSITION:
      type = "Close";
      break;
    case TransactionType.LIQUIDATE_POSITION:
      type = "Liquidated";
      break;
    default:
      break;
  }
  let message = `
    ${type} ${row.tickerSymbol}${row.strike ? `-${row.strike}` : ""} ${
    row.side
  } position`;

  // TODO Size temporary available only for open positions.
  //  Need to improve data logging on API level or aggregate onchain data.
  if (row.type === TransactionType.OPEN_POSITION && row.entry !== row.strike) {
    message += `, Size (${row.symbol}): ${getFormattedAmount(row.amount)}`;
  }

  if (row.entry) {
    message += `, Entry price: ${getFormattedCurrency(row.entry)}`;
  }

  if (row.pnl) {
    message += `, PnL: ${getFormattedCurrency(row.pnl, {
      maximumFractionDigits: 2,
    })}`;
  }

  return message;
};

export const HistoryTable = () => {
  const limit = 5;
  const [paginatedData, setPaginatedData] = useState<PositionHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const rows = useHistory();

  const handleNextPage = () => {
    if (rows && currentPage === Math.ceil(rows.length / limit) - 1) {
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
      rows?.slice(currentPage * limit, (currentPage + 1) * limit) ?? []
    );
  }, [rows, currentPage, limit]);

  return (
    <Container>
      {paginatedData.map((row) => (
        <HistoryRow key={row.hash}>
          <HistoryText>{getFormattedDate(row.date.getTime())}</HistoryText>
          <HistoryText>
            <span>{getFormattedTitle(row)}</span>
            <HistoryExplore
              href={getExplorerLink(row.chainId, ExplorerLinkType.TX, row.hash)}
              target="_blank"
            >
              <FiExternalLink />
            </HistoryExplore>
          </HistoryText>
        </HistoryRow>
      ))}
      <Paginator>
        <Button onClick={handlePreviousPage} variant="unstyled">
          <BsChevronLeft color="gray" />
        </Button>
        <Button onClick={handleNextPage} variant="unstyled">
          <BsChevronRight color="gray" />
        </Button>
      </Paginator>
    </Container>
  );
};
