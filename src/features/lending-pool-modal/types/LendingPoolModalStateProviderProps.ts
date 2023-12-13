import type { TabType } from "./TabType";
import type { ReactNode } from "react";

export interface LendingPoolModalStateProviderProps {
  defaultTabType: TabType;
  pairId: string;
  lendingPoolAddress: string;
  children: ReactNode;
}
