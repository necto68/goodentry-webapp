import { createContext, useMemo, useState } from "react";

import { TabType } from "../types/TabType";

import type { VaultStakeModalState } from "../types/VaultStakeModalState";
import type { VaultStakeModalStateProviderProps } from "../types/VaultStakeModalStateProviderProps";
import type { FC } from "react";

export const VaultStakeModalStateContext = createContext<VaultStakeModalState>({
  selectedTab: TabType.STAKE,
  setSelectedTab: () => undefined,
  vaultId: "",
});

export const VaultStakeModalStateProvider: FC<
  VaultStakeModalStateProviderProps
> = ({ vaultId, children }) => {
  const [selectedTab, setSelectedTab] = useState(TabType.STAKE);

  const value = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      vaultId,
    }),
    [selectedTab, setSelectedTab, vaultId]
  );

  return (
    <VaultStakeModalStateContext.Provider value={value}>
      {children}
    </VaultStakeModalStateContext.Provider>
  );
};
