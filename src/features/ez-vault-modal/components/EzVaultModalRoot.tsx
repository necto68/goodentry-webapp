import { getVaultConfig } from "../../vault/helpers/getVaultConfig";
import { VaultModalStateProvider } from "../../vault-modal/providers/VaultModalStateProvider";
import { VaultModalTransactionsProvider } from "../../vault-modal/providers/VaultModalTransactionsProvider";

import { EzVaultModalContent } from "./EzVaultModalContent";

import type { VaultModalStateProviderProps } from "../../vault-modal/types/VaultModalStateProviderProps";
import type { FC } from "react";

type EzVaultModalProps = Pick<
  VaultModalStateProviderProps,
  "defaultTabType" | "vaultId"
>;

export const EzVaultModalRoot: FC<EzVaultModalProps> = ({
  defaultTabType,
  vaultId,
}) => {
  const {
    addresses: { vault },
  } = getVaultConfig(vaultId);

  return (
    <VaultModalStateProvider
      defaultTabType={defaultTabType}
      vaultAddress={vault}
      vaultId={vaultId}
    >
      <VaultModalTransactionsProvider>
        <EzVaultModalContent />
      </VaultModalTransactionsProvider>
    </VaultModalStateProvider>
  );
};
