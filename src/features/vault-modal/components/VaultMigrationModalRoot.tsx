import { VaultModalStateProvider } from "../providers/VaultModalStateProvider";
import { VaultModalTransactionsProvider } from "../providers/VaultModalTransactionsProvider";
import { TabType } from "../types/TabType";

import { VaultMigrationModalContent } from "./VaultMigrationModalContent";

import type { VaultModalStateProviderProps } from "../types/VaultModalStateProviderProps";
import type { FC } from "react";

type VaultMigrationModalProps = Pick<VaultModalStateProviderProps, "vaultId">;

export const VaultMigrationModalRoot: FC<VaultMigrationModalProps> = ({
  vaultId,
}) => (
  <VaultModalStateProvider defaultTabType={TabType.DEPOSIT} vaultId={vaultId}>
    <VaultModalTransactionsProvider>
      <VaultMigrationModalContent />
    </VaultModalTransactionsProvider>
  </VaultModalStateProvider>
);
