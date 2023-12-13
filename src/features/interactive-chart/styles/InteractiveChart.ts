import styled from "@emotion/styled";

import type { InteractiveChartProps } from "../types/InteractiveChartProps";

type ContainerProps = Pick<InteractiveChartProps, "minHeight">;
export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : "100%")};
  min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : "100%")};
`;
