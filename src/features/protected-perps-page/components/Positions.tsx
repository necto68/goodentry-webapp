import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { useWallet } from "../../wallet/hooks/useWallet";
import { usePositions } from "../hooks/usePositions";
import { Container, Title } from "../styles/Positions";
import { ComponentContainer } from "../styles/ProtectedPerpsPage";

import { PositionsTable } from "./PositionsTable";

export const Positions = () => {
  const { isConnected } = useWallet();
  const positions = usePositions();

  if (!isConnected) {
    return null;
  }

  if (!positions) {
    return (
      <ComponentContainer>
        <Title>{loadingPlaceholder}</Title>
      </ComponentContainer>
    );
  }

  if (positions.length === 0) {
    return (
      <ComponentContainer>
        <Title>No Positions</Title>
      </ComponentContainer>
    );
  }

  return (
    <Container>
      <PositionsTable />
    </Container>
  );
};
