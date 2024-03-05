import { useVaultModalState } from "../stores/useVaultModalState";
import { Container } from "../styles/VaultModal";

import { BalanceInfo } from "./BalanceInfo";
import { VaultMigrationButton } from "./VaultMigrationButton";

export const VaultMigrationModalContent = () => {
  const { vaultId } = useVaultModalState();

  return (
    <Container>
      <VaultMigrationButton />
      <BalanceInfo vaultId={vaultId} />
    </Container>
  );
};
