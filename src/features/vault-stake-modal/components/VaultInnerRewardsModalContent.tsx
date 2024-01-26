import { DescriptionValue } from "../../shared/modal/styles/ModalDescription";
import { Container } from "../../vault-modal/styles/VaultModal";

import { RewardsInfo } from "./RewardsInfo";

export const VaultInnerRewardsModalContent = () => (
  <Container>
    <DescriptionValue>
      The ARB-USDC vault receive rewards daily that are directly deposited in
      the vault.
    </DescriptionValue>
    <RewardsInfo />
  </Container>
);
