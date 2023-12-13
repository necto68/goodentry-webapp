import { useVaultModalState } from "../../vault-modal/stores/useVaultModalState";
import { Container } from "../../vault-modal/styles/VaultModal";

import { EzVaultMigrationButton } from "./EzVaultMigrationButton";
import { MyShareInfo } from "./MyShareInfo";

export const EzVaultMigrationModalContent = () => {
  const { vaultId } = useVaultModalState();

  return (
    <Container>
      <EzVaultMigrationButton />
      <MyShareInfo vaultId={vaultId} />
    </Container>
  );
};
