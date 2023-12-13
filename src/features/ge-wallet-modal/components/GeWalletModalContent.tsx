import { LendingPoolInputCard } from "../../lending-pool-modal/components/LendingPoolInputCard";
import { LendingPoolMainButton } from "../../lending-pool-modal/components/LendingPoolMainButton";
import { LendingPoolSwitcher } from "../../lending-pool-modal/components/LendingPoolSwitcher";
import { Container } from "../../lending-pool-modal/styles/LendingPoolModal";

import { GeWalletInfo } from "./GeWalletInfo";

export const GeWalletModalContent = () => (
  <Container>
    <LendingPoolSwitcher />
    <LendingPoolInputCard />
    <GeWalletInfo />
    <LendingPoolMainButton />
  </Container>
);
