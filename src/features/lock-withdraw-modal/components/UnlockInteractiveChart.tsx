import { useCallback } from "react";

import { InteractiveChart } from "../../interactive-chart/components/InteractiveChart";
import { getFormattedShortDate } from "../../shared/helpers/baseFormatters";
import { getUnlockChartPoints } from "../helpers/getUnlockChartPoints";
import { useLockWithdrawModalState } from "../stores/useLockWithdrawModalState";

import type { ChartPoint } from "../../interactive-chart/types/ChartPoint";
import type { InteractiveChartProps } from "../../interactive-chart/types/InteractiveChartProps";
import type { FC } from "react";

type UnlockInteractiveChartProps = Pick<
  InteractiveChartProps,
  "selectedChartPoint" | "setSelectedChartPoint"
>;

export const UnlockInteractiveChart: FC<UnlockInteractiveChartProps> = ({
  selectedChartPoint,
  setSelectedChartPoint,
}) => {
  const { selectedUnlockSchedule } = useLockWithdrawModalState();

  const { governanceTokenInitUnlock, startTimestamp } =
    selectedUnlockSchedule ?? {};

  const chartPoints =
    governanceTokenInitUnlock && startTimestamp
      ? getUnlockChartPoints(governanceTokenInitUnlock, startTimestamp)
      : [];

  const getSelectedPointerTitle = useCallback<
    (chartPoint: ChartPoint) => [string]
  >((chartPoint) => {
    const { x } = chartPoint;

    const formattedDate = getFormattedShortDate(x);

    return [formattedDate];
  }, []);

  const currentTimestamp = Date.now();
  const defaultPointerX = currentTimestamp;
  const defaultPointerTitle: [string] = [
    getFormattedShortDate(currentTimestamp),
  ];

  return (
    <InteractiveChart
      chartPoints={chartPoints}
      defaultPointerTitle={defaultPointerTitle}
      defaultPointerX={defaultPointerX}
      getSelectedPointerTitle={getSelectedPointerTitle}
      minHeight={115}
      selectedChartPoint={selectedChartPoint}
      setSelectedChartPoint={setSelectedChartPoint}
    />
  );
};
