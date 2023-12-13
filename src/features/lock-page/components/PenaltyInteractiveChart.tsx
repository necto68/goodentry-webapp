import { useCallback } from "react";

import { InteractiveChart } from "../../interactive-chart/components/InteractiveChart";
import { getPenaltyChartPoints } from "../helpers/getPenaltyChartPoints";

import type { ChartPoint } from "../../interactive-chart/types/ChartPoint";
import type { InteractiveChartProps } from "../../interactive-chart/types/InteractiveChartProps";
import type { FC } from "react";

type PenaltyInteractiveChartProps = Pick<
  InteractiveChartProps,
  "selectedChartPoint" | "setSelectedChartPoint"
>;

export const PenaltyInteractiveChart: FC<PenaltyInteractiveChartProps> = ({
  selectedChartPoint,
  setSelectedChartPoint,
}) => {
  const chartPoints = getPenaltyChartPoints();

  const getSelectedPointerTitle = useCallback<
    (chartPoint: ChartPoint) => [string]
  >((chartPoint) => {
    const { x } = chartPoint;

    return [`Day ${x}`];
  }, []);

  return (
    <InteractiveChart
      chartPoints={chartPoints}
      getSelectedPointerTitle={getSelectedPointerTitle}
      minHeight={195}
      selectedChartPoint={selectedChartPoint}
      setSelectedChartPoint={setSelectedChartPoint}
    />
  );
};
