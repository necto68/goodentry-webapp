import { useVaultModalState } from "../stores/useVaultModalState";
import { Container } from "../styles/VaultModal";

import { MyShareInfo } from "./MyShareInfo";
import { VaultMigrationButton } from "./VaultMigrationButton";

export const VaultMigrationModalContent = () => {
  const { vaultId } = useVaultModalState();

  return (
    <Container>
      <VaultMigrationButton />
      <MyShareInfo vaultId={vaultId} />
    </Container>
  );
};
