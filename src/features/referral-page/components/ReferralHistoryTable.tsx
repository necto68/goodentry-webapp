import { HistoryTx } from "../../protected-perps-page/styles/HistoryTable";
import { getFormattedDate } from "../../shared/helpers/baseFormatters";
import { getFormattedTokenAmountWithSymbol } from "../../shared/helpers/formatters";
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
      String(getFormattedTokenAmountWithSymbol(reward, token)),
  },
];

const getRowKey = ({ transactionHash }: ReferralHistoryItem) => transactionHash;

export const ReferralHistoryTable = () => {
  const referrals = useReferrals();
  const { referralHistory: rows } = referrals ?? {};

  return (
    <Container>
      <Table
        columns={columns}
        getRowKey={getRowKey}
        limit={10}
        rows={rows ?? []}
      />
    </Container>
  );
};
