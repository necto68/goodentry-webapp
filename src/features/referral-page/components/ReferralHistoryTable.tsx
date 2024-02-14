import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import {
  HistoryTx,
  Paginator,
} from "../../protected-perps-page/styles/HistoryTable";
import { useReferralsQuery } from "../../queries/hooks/useReferralsQuery";
import {
  getFormattedDate,
  getFormattedFullCurrency,
} from "../../shared/helpers/baseFormatters";
import { Table } from "../../table/components/Table";
import { getTruncatedAddress } from "../../web3/helpers/addresses";
import { getExplorerLink } from "../../web3/helpers/getExplorerLink";
import { ExplorerLinkType } from "../../web3/types/ExplorerLinkType";
import { useReferrals } from "../hooks/useReferrals";
import { Container } from "../styles/ReferralHistoryTable";

import type { ReferralHistoryItem } from "../../queries/types/ReferralInfo";
import type { Column } from "../../table/types/Column";

const columns: Column<ReferralHistoryItem>[] = [
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
    key: "reward",
    title: "Reward",

    render: ({ reward, token }) =>
      `${getFormattedFullCurrency(reward)} ${token}`,
  },
];

const getRowKey = ({ transactionHash }: ReferralHistoryItem) => transactionHash;

export const ReferralHistoryTable = () => {
  const limit = 10;
  const [paginatedData, setPaginatedData] = useState<ReferralHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const referrals = useReferrals();
  const { isLoading } = useReferralsQuery();
  const { referralHistory: rows } = referrals ?? {};

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

  return !isLoading && rows?.length ? (
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
  ) : null;
};
