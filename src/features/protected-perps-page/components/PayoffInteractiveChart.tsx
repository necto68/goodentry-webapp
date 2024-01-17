import { useCallback } from "react";

import { InteractiveChart } from "../../interactive-chart/components/InteractiveChart";
import { getFormattedPrice } from "../../shared/helpers/formatters";
import { useTradePanelStrikePrice } from "../../trade-panel/hooks/useTradePanelStrikePrice";
import { useTradePanelState } from "../../trade-panel/stores/useTradePanelState";
import { getChartPoints } from "../helpers/chartPoints";
import { usePair } from "../hooks/usePair";
import { usePairPrices } from "../hooks/usePairPrices";

import type { ChartPoint } from "../../interactive-chart/types/ChartPoint";
import type { InteractiveChartProps } from "../../interactive-chart/types/InteractiveChartProps";
import type { FC } from "react";

type PayoffInteractiveChartProps = Pick<
  InteractiveChartProps,
  "selectedChartPoint" | "setSelectedChartPoint"
>;

export const PayoffInteractiveChart: FC<PayoffInteractiveChartProps> = ({
  selectedChartPoint,
  setSelectedChartPoint,
}) => {
  const { positionSide, pairId } = useTradePanelState();
  const { baseTokenSymbol } = usePair(pairId) ?? {};
  const { baseTokenPrice } = usePairPrices(pairId) ?? {};
  const strikePrice = useTradePanelStrikePrice(positionSide, pairId);

  const chartPoints =
    baseTokenPrice && strikePrice
      ? getChartPoints(positionSide, baseTokenPrice, strikePrice)
      : [];

  const formattedBaseTokenPrice = baseTokenPrice
    ? getFormattedPrice(baseTokenPrice)
    : "";

  const defaultPointerTitle: [string, string] = [
    baseTokenSymbol ? `${baseTokenSymbol} Price Now` : "",
    formattedBaseTokenPrice,
  ];

  const getSelectedPointerTitle = useCallback<
    (chartPoint: ChartPoint) => [string, string]
  >(
    (chartPoint) => {
      const { x } = chartPoint;

      const title0 = baseTokenSymbol ? `Expected ${baseTokenSymbol} Price` : "";
      const title1 = getFormattedPrice(x);

      return [title0, title1];
    },
    [baseTokenSymbol]
  );

  return (
    <InteractiveChart
      chartPoints={chartPoints}
      defaultPointerTitle={defaultPointerTitle}
      defaultPointerX={baseTokenPrice}
      getSelectedPointerTitle={getSelectedPointerTitle}
      minHeight={115}
      selectedChartPoint={selectedChartPoint}
      setSelectedChartPoint={setSelectedChartPoint}
    />
  );
};
