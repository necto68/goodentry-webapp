import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultModalStateProvider } from "../../vault-modal/providers/VaultModalStateProvider";
import { VaultModalTransactionsProvider } from "../../vault-modal/providers/VaultModalTransactionsProvider";
import { TabType } from "../../vault-modal/types/TabType";

import { EzVaultMigrationModalContent } from "./EzVaultMigrationModalContent";

import type { VaultModalStateProviderProps } from "../../vault-modal/types/VaultModalStateProviderProps";
import type { FC } from "react";

type EzVaultMigrationModalProps = Pick<VaultModalStateProviderProps, "vaultId">;

export const EzVaultMigrationModalRoot: FC<EzVaultMigrationModalProps> = ({
  vaultId,
}) => {
  const {
    addresses: { vault },
  } = getVaultConfig(vaultId);

  return (
    <VaultModalStateProvider
      defaultTabType={TabType.DEPOSIT}
      vaultAddress={vault}
      vaultId={vaultId}
    >
      <VaultModalTransactionsProvider>
        <EzVaultMigrationModalContent />
      </VaultModalTransactionsProvider>
    </VaultModalStateProvider>
  );
};
