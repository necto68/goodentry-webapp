import { Title } from "../../protected-perps-page/styles/Positions";
import { loadingPlaceholder } from "../../shared/constants/placeholders";
import { useWallet } from "../../wallet/hooks/useWallet";
import { useLockData } from "../hooks/useLockData";
import { Container } from "../styles/UnlockSchedules";

import { UnlockSchedulesTable } from "./UnlockSchedulesTable";

export const UnlockSchedules = () => {
  const { isConnected } = useWallet();
  const { unlockSchedules } = useLockData() ?? {};

  if (!isConnected) {
    return null;
  }

  if (!unlockSchedules) {
    return (
      <Container>
        <Title>{loadingPlaceholder}</Title>
      </Container>
    );
  }

  if (unlockSchedules.length === 0) {
    return (
      <Container>
        <Title>No Unlock Schedules</Title>
      </Container>
    );
  }

  return <UnlockSchedulesTable />;
};
