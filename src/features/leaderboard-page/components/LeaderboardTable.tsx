import { HistoryTx } from "../../protected-perps-page/styles/HistoryTable";
import {
  ColorText,
  ProfitAndLossCell,
} from "../../protected-perps-page/styles/PositionsTable";
import {
  getFormattedFullCurrency,
  getFormattedProfitAndLoss,
  getFormattedProfitAndLossPercentage,
} from "../../shared/helpers/baseFormatters";
import { Table } from "../../table/components/Table";
import { getTruncatedAddress } from "../../web3/helpers/addresses";
import { getExplorerLink } from "../../web3/helpers/getExplorerLink";
import { ChainId } from "../../web3/types/ChainId";
import { ExplorerLinkType } from "../../web3/types/ExplorerLinkType";
import { useLeaderboardData } from "../hooks/useLeaderboardData";
import { LeaderboardProfitAndLossRow } from "../styles/LeaderboardTable";
import { TabType } from "../types/TabType";

import type { LeaderboardRow } from "../../queries/types/LeaderboardData";
import type { Column } from "../../table/types/Column";
import type { LeaderboardTableHeaderProps } from "../types/LeaderboardTableHeaderProps";
import type { FC } from "react";

const columns: Column<LeaderboardRow>[] = [
  {
    key: "rank",
    title: "Rank",
  },
  {
    key: "account",
    title: "Account",

    render: ({ account }) => (
      <HistoryTx
        href={getExplorerLink(
          ChainId.ARBITRUM,
          ExplorerLinkType.ADDRESS,
          account
        )}
        target="_blank"
      >
        {getTruncatedAddress(account)}
      </HistoryTx>
    ),
  },
  {
    key: "week",
    title: "Week",

    render: ({ week }) => `Week ${week}`,
  },
  {
    key: "weeklyTradesAmount",
    title: "Total Trades Completed",
  },
  {
    key: "weeklyTotalVolume",
    title: "Total Weekly Volume (USD)",

    render: ({ weeklyTotalVolume }) =>
      getFormattedFullCurrency(weeklyTotalVolume),
  },
  {
    key: "weeklyProfitAndLoss",
    title: "Weekly PNL (USD)",

    render: ({ weeklyProfitAndLoss, weeklyProfitAndLossPercentage }) => {
      const isPositive = weeklyProfitAndLoss > 0;

      const formattedProfitAndLoss =
        getFormattedProfitAndLoss(weeklyProfitAndLoss);
      const formattedProfitAndLossPercentage =
        getFormattedProfitAndLossPercentage(weeklyProfitAndLossPercentage);

      return (
        <LeaderboardProfitAndLossRow>
          <ProfitAndLossCell>
            <ColorText isPositive={isPositive}>
              {formattedProfitAndLoss}
            </ColorText>
            <ColorText isPositive={isPositive}>
              {formattedProfitAndLossPercentage}
            </ColorText>
          </ProfitAndLossCell>
        </LeaderboardProfitAndLossRow>
      );
    },
  },
];

const getRowKey = (row: LeaderboardRow) => row.id;

export type LeaderboardTableProps = Pick<
  LeaderboardTableHeaderProps,
  "filterValue" | "selectedTab"
>;

export const LeaderboardTable: FC<LeaderboardTableProps> = ({
  selectedTab,
  filterValue,
}) => {
  const rows = useLeaderboardData();

  if (!rows) {
    return null;
  }

  const filteredRows = rows.filter((row) => {
    const account = row.account.toLowerCase();
    const filter = filterValue.toLowerCase();

    return account.includes(filter);
  });

  const sortedRows =
    selectedTab === TabType.WINNERS
      ? filteredRows
      : filteredRows.slice().reverse();

  return <Table columns={columns} getRowKey={getRowKey} rows={sortedRows} />;
};
