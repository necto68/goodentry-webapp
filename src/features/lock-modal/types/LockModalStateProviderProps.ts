import type { TabType } from "./TabType";
import type { ReactNode } from "react";

export interface LockModalStateProviderProps {
  defaultTabType: TabType;
  children: ReactNode;
}
