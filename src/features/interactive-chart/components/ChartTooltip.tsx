import { Container, Title } from "../styles/ChartTooltip";

import type { ChartPoint } from "../types/ChartPoint";
import type { InteractiveChartProps } from "../types/InteractiveChartProps";
import type { FC } from "react";
import type { TooltipProps } from "recharts";

interface ChartTooltipProps
  extends TooltipProps<number, string>,
    Pick<InteractiveChartProps, "getSelectedPointerTitle"> {}

export const ChartTooltip: FC<ChartTooltipProps> = ({
  active,
  payload,
  getSelectedPointerTitle,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const chartPoint = payload[0].payload as ChartPoint;
  const [title0, title1] = getSelectedPointerTitle
    ? getSelectedPointerTitle(chartPoint)
    : [];

  return (
    <Container>
      {title0 ? <Title>{title0}</Title> : null}
      {title1 ? <Title>{title1}</Title> : null}
    </Container>
  );
};
