import { VaultInputCard } from "../../vault-modal/components/VaultInputCard";
import { VaultMainButton } from "../../vault-modal/components/VaultMainButton";
import { VaultSwitcher } from "../../vault-modal/components/VaultSwitcher";
import { Container } from "../../vault-modal/styles/VaultModal";

import { VaultInfo } from "./VaultInfo";

export const EzVaultModalContent = () => (
  <Container>
    <VaultSwitcher />
    <VaultInputCard />
    <VaultInfo />
    <VaultMainButton />
  </Container>
);
