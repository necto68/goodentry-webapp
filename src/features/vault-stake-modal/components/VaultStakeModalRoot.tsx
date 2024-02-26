import { VaultStakeModalStateProvider } from "../providers/VaultStakeModalStateProvider";
import { VaultStakeModalTransactionsProvider } from "../providers/VaultStakeModalTransactionsProvider";

import { VaultStakeModalContent } from "./VaultStakeModalContent";

import type { VaultStakeModalStateProviderProps } from "../types/VaultStakeModalStateProviderProps";
import type { FC } from "react";

type VaultStakeModalProps = Pick<VaultStakeModalStateProviderProps, "vaultId">;

export const VaultStakeModalRoot: FC<VaultStakeModalProps> = ({ vaultId }) => (
  <VaultStakeModalStateProvider vaultId={vaultId}>
    <VaultStakeModalTransactionsProvider>
      <VaultStakeModalContent />
    </VaultStakeModalTransactionsProvider>
  </VaultStakeModalStateProvider>
);
