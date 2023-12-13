import { useParams } from "react-router-dom";

import { EzVaultMigrationModalRoot } from "../../ez-vault-modal/components/EzVaultMigrationModalRoot";
import { EzVaultModalRoot } from "../../ez-vault-modal/components/EzVaultModalRoot";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultStatus } from "../../vault/types/VaultStatus";
import { TabType } from "../../vault-modal/types/TabType";
import { Container } from "../styles/VaultModal";

export const VaultModal = () => {
  const { vaultId = "" } = useParams();
  const { status } = getVaultConfig(vaultId);

  return (
    <Container>
      {status === VaultStatus.DEPRECATED ? (
        <EzVaultMigrationModalRoot vaultId={vaultId} />
      ) : (
        <EzVaultModalRoot defaultTabType={TabType.DEPOSIT} vaultId={vaultId} />
      )}
    </Container>
  );
};
