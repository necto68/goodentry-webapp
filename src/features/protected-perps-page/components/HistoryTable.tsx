import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import {
  getFormattedDate,
  getFormattedFullCurrency,
} from "../../shared/helpers/baseFormatters";
import { Table } from "../../table/components/Table";
import { getPositionSideTitle } from "../../trade-panel/helpers/getPositionSideTitle";
import { PositionSide } from "../../trade-panel/types/PositionSide";
import { getTruncatedAddress } from "../../web3/helpers/addresses";
import { getExplorerLink } from "../../web3/helpers/getExplorerLink";
import { ExplorerLinkType } from "../../web3/types/ExplorerLinkType";
import { useHistory } from "../hooks/useHistory";
import {
  Container,
  HistoryTx,
  LongText,
  Paginator,
  ShortText,
} from "../styles/HistoryTable";

import type { PositionHistoryItem } from "../../queries/types/PositionHistoryItem";
import type { Column } from "../../table/types/Column";

const columns: Column<PositionHistoryItem>[] = [
  {
    key: "timestamp",
    title: "Date",

    render: ({ timestamp }) => getFormattedDate(timestamp),
  },
  {
    key: "transactionHash",
    title: "Tx",

    render: ({ transactionHash, chainId }) => (
      <HistoryTx
        href={getExplorerLink(chainId, ExplorerLinkType.TX, transactionHash)}
        target="_blank"
      >
        {getTruncatedAddress(transactionHash)}
      </HistoryTx>
    ),
  },
  {
    key: "pairId",
    title: "Pair",
    render: ({ pairId }) => pairId,
  },
  {
    key: "positionSide",
    title: "Direction",

    render: ({ positionSide }) =>
      positionSide === PositionSide.LONG ? (
        <LongText>{getPositionSideTitle(positionSide)}</LongText>
      ) : (
        <ShortText>{getPositionSideTitle(positionSide)}</ShortText>
      ),
  },
  {
    key: "entryPrice",
    title: "Entry Price",

    render: ({ entryPrice }) => getFormattedFullCurrency(entryPrice),
  },
  {
    key: "amount",
    title: "Amount",

    render: ({ amount }) => getFormattedFullCurrency(amount),
  },
  {
    key: "pnl",
    title: "PNL",

    render: ({ pnl }) => getFormattedFullCurrency(pnl),
  },
];

const getRowKey = ({ transactionHash }: PositionHistoryItem) => transactionHash;

export const HistoryTable = () => {
  const limit = 5;
  const [paginatedData, setPaginatedData] = useState<PositionHistoryItem[]>([]);
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
      <Table columns={columns} getRowKey={getRowKey} rows={paginatedData} />
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
