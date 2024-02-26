import { VaultStakeModalStateProvider } from "../providers/VaultStakeModalStateProvider";
import { VaultStakeModalTransactionsProvider } from "../providers/VaultStakeModalTransactionsProvider";

import { VaultInnerRewardsModalContent } from "./VaultInnerRewardsModalContent";

import type { VaultStakeModalStateProviderProps } from "../types/VaultStakeModalStateProviderProps";
import type { FC } from "react";

type VaultStakeModalProps = Pick<VaultStakeModalStateProviderProps, "vaultId">;

export const VaultInnerRewardsModalRoot: FC<VaultStakeModalProps> = ({
  vaultId,
}) => (
  <VaultStakeModalStateProvider vaultId={vaultId}>
    <VaultStakeModalTransactionsProvider>
      <VaultInnerRewardsModalContent />
    </VaultStakeModalTransactionsProvider>
  </VaultStakeModalStateProvider>
);
