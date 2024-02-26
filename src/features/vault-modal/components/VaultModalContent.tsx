import { Container } from "../styles/VaultModal";

import { VaultInfo } from "./VaultInfo";
import { VaultInputCard } from "./VaultInputCard";
import { VaultMainButton } from "./VaultMainButton";
import { VaultSwitcher } from "./VaultSwitcher";

export const VaultModalContent = () => (
  <Container>
    <VaultSwitcher />
    <VaultInputCard />
    <VaultInfo />
    <VaultMainButton />
  </Container>
);
