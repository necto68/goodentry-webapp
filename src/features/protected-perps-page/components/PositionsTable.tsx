import {
  getFormattedProfitAndLossPercentage,
  getFormattedFullCurrency,
  getFormattedProfitAndLoss,
} from "../../shared/helpers/baseFormatters";
import {
  getFormattedBorrowRate,
  getFormattedRunway,
  getFormattedTokenAmount,
} from "../../shared/helpers/formatters";
import { Table } from "../../table/components/Table";
import { getPositionSideTitle } from "../../trade-panel/helpers/getPositionSideTitle";
import { isPositionSideLong } from "../../trade-panel/helpers/isPositionSideLong";
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
    key: "positionSide",
    title: "Side",

    render: ({ positionSide }) => {
      const isLong = isPositionSideLong(positionSide);
      const positionSideTitle = getPositionSideTitle(positionSide);

      return <ColorText isPositive={isLong}>{positionSideTitle}</ColorText>;
    },
  },
  {
    key: "entryPrice",
    title: "Entry Price",
    render: ({ entryPrice }) => getFormattedFullCurrency(entryPrice),
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

  // {
  //   key: "initialCollateral",
  //   title: "Wager (Leverage)",
  //
  //   render: ({ initialCollateral, leverage }) => {
  //     const formattedInitialCollateral =
  //     getFormattedTokenAmount(initialCollateral);
  //     const formattedLeverage = getFormattedLeverage(leverage);
  //
  //     return (
  //       <ProfitAndLossRow>
  //         <ProfitAndLossCell>
  //           <span>{formattedInitialCollateral}</span>
  //           <span>{formattedLeverage}</span>
  //         </ProfitAndLossCell>
  //       </ProfitAndLossRow>
  //     );
  //   },
  // },
  {
    key: "initialCollateral",
    title: "Wager",

    render: ({ initialCollateral }) =>
      getFormattedTokenAmount(initialCollateral),
  },
  {
    key: "positionSize",
    title: "Position Size",

    render: ({ positionSize }) => getFormattedTokenAmount(positionSize),
  },
  {
    key: "profitAndLoss",
    title: "PNL",

    render: (position) => {
      const { profitAndLoss, profitAndLossPercentage } = position;

      const isPositive = profitAndLoss > 0;

      const formattedProfitAndLoss = getFormattedProfitAndLoss(profitAndLoss);
      const formattedProfitAndLossPercentage =
        getFormattedProfitAndLossPercentage(profitAndLossPercentage);

      return (
        <ProfitAndLossRow>
          <ProfitAndLossCell>
            <ColorText isPositive={isPositive}>
              {formattedProfitAndLoss}
            </ColorText>
            <ColorText isPositive={isPositive}>
              {formattedProfitAndLossPercentage}
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
