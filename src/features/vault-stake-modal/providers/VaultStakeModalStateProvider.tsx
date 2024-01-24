import { createContext, useMemo } from "react";

import type { VaultStakeModalState } from "../types/VaultStakeModalState";
import type { VaultStakeModalStateProviderProps } from "../types/VaultStakeModalStateProviderProps";
import type { FC } from "react";

export const VaultStakeModalStateContext = createContext<VaultStakeModalState>({
  vaultId: "",
});

export const VaultStakeModalStateProvider: FC<
  VaultStakeModalStateProviderProps
> = ({ vaultId, children }) => {
  const value = useMemo(
    () => ({
      vaultId,
    }),
    [vaultId]
  );

  return (
    <VaultStakeModalStateContext.Provider value={value}>
      {children}
    </VaultStakeModalStateContext.Provider>
  );
};
