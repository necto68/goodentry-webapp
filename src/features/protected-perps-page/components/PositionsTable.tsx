import { PositionSide } from "../../queries/types/Position";
import {
  getFormattedAmount,
  getFormattedAPY,
  getFormattedFullCurrency,
} from "../../shared/helpers/baseFormatters";
import { getFormattedTickerTitle } from "../../shared/helpers/formatters";
import { Table } from "../../table/components/Table";
import { TitleCell } from "../../table/components/TitleCell";
import { usePositions } from "../hooks/usePositions";
import {
  ColorText,
  ProfitAndLossCell,
  ProfitAndLossRow,
  ActionsContainer,
} from "../styles/PositionsTable";

import { OpenTradeModalButton } from "./OpenTradeModalButton";
import { PositionActionsButton } from "./PositionActionsButton";

import type { Position } from "../../queries/types/Position";
import type { Column } from "../../table/types/Column";

const columns: Column<Position>[] = [
  {
    key: "id",
    title: "Instrument",

    render: ({ ticker: { symbol, strikePrice } }) => (
      <TitleCell
        symbols={[symbol]}
        title={getFormattedTickerTitle(symbol, strikePrice)}
      />
    ),
  },
  {
    key: "side",
    title: "Side",

    render: ({ side }) => {
      const isPositive = side === PositionSide.LONG;

      return (
        <ColorText isPositive={isPositive}>
          {isPositive ? "Long" : "Short"}
        </ColorText>
      );
    },
  },
  {
    key: "size",
    title: "Size (USDC)",
    render: ({ size }) => getFormattedAmount(size),
  },
  {
    key: "ticker",
    title: "Funding / 1h (USDC)",

    render: ({ ticker, size }) =>
      getFormattedAmount(size.mul(ticker.borrowRatePerHour), {
        maximumFractionDigits: 4,
      }),
  },
  {
    key: "entryPrice",
    title: "Entry Price",
    render: ({ entryPrice }) => getFormattedFullCurrency(entryPrice),
  },
  {
    key: "profitAndLossValue",
    title: "PNL",

    render: (position) => {
      const { size, profitAndLossValue } = position;
      const isPositive = profitAndLossValue.gt(0);
      const formattedProfitAndLossValue = getFormattedFullCurrency(
        profitAndLossValue.toNumber()
      );
      const formattedProfitAndLossPercent = getFormattedAPY(
        size.gt(0) ? profitAndLossValue.div(size).toNumber() : 0
      );

      return (
        <ProfitAndLossRow>
          <ProfitAndLossCell>
            <ColorText isPositive={isPositive}>
              {formattedProfitAndLossValue}
            </ColorText>
            <ColorText isPositive={isPositive}>
              {formattedProfitAndLossPercent}
            </ColorText>
          </ProfitAndLossCell>
        </ProfitAndLossRow>
      );
    },
  },
  {
    title: "Actions",

    render: (position) => (
      <ActionsContainer>
        <OpenTradeModalButton position={position} />
        <PositionActionsButton position={position} />
      </ActionsContainer>
    ),
  },
];

const getRowKey = (row: Position) => `${row.id}_${row.size.toString()}`;

export const PositionsTable = () => {
  const rows = usePositions();

  if (!rows) {
    return null;
  }

  return <Table columns={columns} getRowKey={getRowKey} rows={rows} />;
};
