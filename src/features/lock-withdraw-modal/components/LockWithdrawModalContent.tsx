import { Container } from "../../vault-modal/styles/VaultModal";

import { LockWithdrawMainButton } from "./LockWithdrawMainButton";
import { UnlockChart } from "./UnlockChart";
import { UnlockScheduleInfo } from "./UnlockScheduleInfo";

export const LockWithdrawModalContent = () => (
  <Container>
    <UnlockChart />
    <UnlockScheduleInfo />
    <LockWithdrawMainButton />
  </Container>
);
