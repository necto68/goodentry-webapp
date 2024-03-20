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
import { useLeaderboardState } from "../hooks/useLeaderboardState";
import { LeaderboardProfitAndLossRow } from "../styles/LeaderboardTable";
import { TabType } from "../types/TabType";

import type { LeaderboardRow } from "../../queries/types/LeaderboardData";
import type { Column } from "../../table/types/Column";

const columns: Column<LeaderboardRow>[] = [
  {
    key: "rank",
    title: "Rank",
  },
  {
    key: "account",
    title: "Account",

    filterBy: ({ account }) => account,

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

export const LeaderboardTable = () => {
  const { selectedTab, addressFilterValue, selectedWeekRows } =
    useLeaderboardState();

  if (!selectedWeekRows) {
    return null;
  }

  const sortedRows =
    selectedTab === TabType.WINNERS
      ? selectedWeekRows
      : Array.from(selectedWeekRows).reverse();

  return (
    <Table
      columns={columns}
      filterInputValue={addressFilterValue}
      getRowKey={getRowKey}
      limit={10}
      rows={sortedRows}
    />
  );
};
