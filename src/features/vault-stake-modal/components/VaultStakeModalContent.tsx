import { Container } from "../../vault-modal/styles/VaultModal";

import { RewardTrackerInfo } from "./RewardTrackerInfo";
import { StakeMainButton } from "./StakeMainButton";
import { StakeSwitcher } from "./StakeSwitcher";

export const VaultStakeModalContent = () => (
  <Container>
    <StakeSwitcher />
    <RewardTrackerInfo />
    <StakeMainButton />
  </Container>
);
