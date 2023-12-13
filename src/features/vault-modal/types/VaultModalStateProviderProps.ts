import type { TabType } from "./TabType";
import type { ReactNode } from "react";

export interface VaultModalStateProviderProps {
  defaultTabType: TabType;
  vaultId: string;
  vaultAddress: string;
  children: ReactNode;
}
