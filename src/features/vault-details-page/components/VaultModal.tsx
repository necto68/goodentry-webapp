import { useParams } from "react-router-dom";

import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { VaultMigrationModalRoot } from "../../vault-modal/components/VaultMigrationModalRoot";
import { VaultModalRoot } from "../../vault-modal/components/VaultModalRoot";
import { TabType } from "../../vault-modal/types/TabType";
import { Container } from "../styles/VaultModal";

export const VaultModal = () => {
  const { vaultId = "" } = useParams();
  const { status } = getVaultConfig(vaultId);

  return (
    <Container>
      {status === VaultStatus.DEPRECATED ? (
        <VaultMigrationModalRoot vaultId={vaultId} />
      ) : (
        <VaultModalRoot defaultTabType={TabType.DEPOSIT} vaultId={vaultId} />
      )}
    </Container>
  );
};
