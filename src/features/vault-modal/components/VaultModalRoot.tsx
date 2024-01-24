import { VaultModalStateProvider } from "../providers/VaultModalStateProvider";
import { VaultModalTransactionsProvider } from "../providers/VaultModalTransactionsProvider";

import { VaultModalContent } from "./VaultModalContent";

import type { VaultModalStateProviderProps } from "../types/VaultModalStateProviderProps";
import type { FC } from "react";

type VaultModalProps = Pick<
  VaultModalStateProviderProps,
  "defaultTabType" | "vaultId"
>;

export const VaultModalRoot: FC<VaultModalProps> = ({
  defaultTabType,
  vaultId,
}) => (
  <VaultModalStateProvider defaultTabType={defaultTabType} vaultId={vaultId}>
    <VaultModalTransactionsProvider>
      <VaultModalContent />
    </VaultModalTransactionsProvider>
  </VaultModalStateProvider>
);
