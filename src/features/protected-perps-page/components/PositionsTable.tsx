import { PositionSide } from "../../queries/types/Position";
import {
  getFormattedAmount,
  getFormattedAPY,
  getFormattedFullCurrency,
  getFormattedLeverage,
} from "../../shared/helpers/baseFormatters";
import {
  getFormattedBorrowRate,
  getFormattedRunway,
} from "../../shared/helpers/formatters";
import { Table } from "../../table/components/Table";
import { usePositions } from "../hooks/usePositions";
import {
  ColorText,
  ProfitAndLossCell,
  ProfitAndLossRow,
  ActionsContainer,
} from "../styles/PositionsTable";

import { AssetCell } from "./AssetCell";
import { OpenTradeModalButton } from "./OpenTradeModalButton";
import { PositionActionsButton } from "./PositionActionsButton";

import type { Position } from "../../queries/types/Position";
import type { Column } from "../../table/types/Column";

const columns: Column<Position>[] = [
  {
    key: "pairId",
    title: "Asset",

    render: ({ pairId }) => <AssetCell pairId={pairId} />,
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
    key: "entryPrice",
    title: "Entry Price",
    render: ({ entryPrice }) => getFormattedFullCurrency(entryPrice),
  },
  {
    key: "initialCollateral",
    title: "Wager (Leverage)",

    render: ({ initialCollateral, leverage }) => {
      const formattedInitialCollateral = getFormattedAmount(initialCollateral);
      const formattedLeverage = getFormattedLeverage(leverage);

      return (
        <ProfitAndLossRow>
          <ProfitAndLossCell>
            <span>{formattedInitialCollateral}</span>
            <span>{formattedLeverage}</span>
          </ProfitAndLossCell>
        </ProfitAndLossRow>
      );
    },
  },
  {
    key: "positionSize",
    title: "Position Size",

    render: ({ positionSize }) => getFormattedAmount(positionSize),
  },
  {
    key: "optionHourlyBorrowRate",
    title: "Funding / 1h",

    render: ({ optionHourlyBorrowRate }) =>
      getFormattedBorrowRate(optionHourlyBorrowRate),
  },
  {
    key: "runwayInSeconds",
    title: "Runway",
    render: ({ runwayInSeconds }) => getFormattedRunway(runwayInSeconds),
  },
  {
    key: "profitAndLossValue",
    title: "PNL",

    render: (position) => {
      const { initialCollateral, profitAndLossValue } = position;
      const isPositive = profitAndLossValue.gt(0);
      const formattedProfitAndLossValue = getFormattedFullCurrency(
        profitAndLossValue.toNumber()
      );

      const profitAndLossPercentValue = initialCollateral.gt(0)
        ? profitAndLossValue.div(initialCollateral).toNumber()
        : 0;

      const formattedProfitAndLossPercent = getFormattedAPY(
        profitAndLossPercentValue
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

const getRowKey = (row: Position) => `${row.id}_${row.pairId}`;

export const PositionsTable = () => {
  const rows = usePositions();

  if (!rows) {
    return null;
  }

  return <Table columns={columns} getRowKey={getRowKey} rows={rows} />;
};
