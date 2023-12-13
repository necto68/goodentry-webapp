import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useHistory } from "../hooks/useHistory";
import { Container, Title } from "../styles/Positions";
import { ComponentContainer } from "../styles/ProtectedPerpsPage";

import { HistoryTable } from "./HistoryTable";

export const PositionsHistory = () => {
  const { isConnected } = useWallet();
  const transactions = useHistory();

  if (!isConnected) {
    return null;
  }

  if (!transactions) {
    return (
      <ComponentContainer>
        <Title>{loadingPlaceholder}</Title>
      </ComponentContainer>
    );
  }

  if (transactions.length === 0) {
    return (
      <ComponentContainer>
        <Title>No transactions</Title>
      </ComponentContainer>
    );
  }

  return (
    <Container>
      <HistoryTable />
    </Container>
  );
};
