import { Separator } from "../../public-sale-page/styles/ClaimInformation";
import { Container } from "../../vault-modal/styles/VaultModal";

import { ClaimableBalanceInfo } from "./ClaimableBalanceInfo";
import { ClaimMainButton } from "./ClaimMainButton";
import { RewardTrackerInfo } from "./RewardTrackerInfo";
import { StakeMainButton } from "./StakeMainButton";
import { StakeSwitcher } from "./StakeSwitcher";

export const VaultStakeModalContent = () => (
  <Container>
    <StakeSwitcher />
    <RewardTrackerInfo />
    <StakeMainButton />
    <Separator />
    <ClaimableBalanceInfo />
    <ClaimMainButton />
  </Container>
);
