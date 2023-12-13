import { Container } from "../styles/SwapContainer";

import type { FC, ReactNode } from "react";

interface SwapContainerProps {
  readonly children: ReactNode;
}

export const SwapContainer: FC<SwapContainerProps> = ({ children }) => (
  <Container>{children}</Container>
);
