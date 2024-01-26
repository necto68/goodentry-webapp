import { Separator } from "../../public-sale-page/styles/ClaimInformation";
import { Container } from "../../vault-modal/styles/VaultModal";

import { BalancesInfo } from "./BalancesInfo";
import { ClaimableBalanceInfo } from "./ClaimableBalanceInfo";
import { ClaimMainButton } from "./ClaimMainButton";
import { RewardsInfo } from "./RewardsInfo";
import { StakeMainButton } from "./StakeMainButton";
import { StakeSwitcher } from "./StakeSwitcher";

export const VaultStakeModalContent = () => (
  <Container>
    <StakeSwitcher />
    <RewardsInfo />
    <BalancesInfo />
    <StakeMainButton />
    <Separator />
    <ClaimableBalanceInfo />
    <ClaimMainButton />
  </Container>
);
