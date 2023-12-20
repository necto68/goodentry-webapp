import { useCallback } from "react";

import { InteractiveChart } from "../../interactive-chart/components/InteractiveChart";
import { getFormattedCurrentPrice } from "../../shared/helpers/formatters";
import { useTradePanelState } from "../../trade-panel/stores/useTradePanelState";
import { getChartPoints } from "../helpers/chartPoints";
import { useAssetPrices } from "../hooks/useAssetPrices";

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
  const { selectedTab } = useTradePanelState();

  // TODO: v2 update
  const strikePrice = 2000;
  const symbol = "SYMBOL";

  const { currentPrice } = useAssetPrices() ?? {};

  const chartPoints = currentPrice
    ? getChartPoints(selectedTab, currentPrice, strikePrice)
    : [];

  const formattedCurrentPrice = currentPrice
    ? getFormattedCurrentPrice(currentPrice)
    : "";

  const defaultPointerTitle: [string, string] = [
    `${symbol} Price Now`,
    formattedCurrentPrice,
  ];

  const getSelectedPointerTitle = useCallback<
    (chartPoint: ChartPoint) => [string, string]
  >(
    (chartPoint) => {
      const { x } = chartPoint;

      const title0 = `Expected ${symbol} Price`;
      const title1 = getFormattedCurrentPrice(x);

      return [title0, title1];
    },
    [symbol]
  );

  return (
    <InteractiveChart
      chartPoints={chartPoints}
      defaultPointerTitle={defaultPointerTitle}
      defaultPointerX={currentPrice}
      getSelectedPointerTitle={getSelectedPointerTitle}
      minHeight={115}
      selectedChartPoint={selectedChartPoint}
      setSelectedChartPoint={setSelectedChartPoint}
    />
  );
};
