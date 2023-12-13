import type { UnlockSchedule } from "../../queries/types/LockData";
import type { ReactNode } from "react";

export interface LockWithdrawModalStateProviderProps {
  unlockScheduleId: UnlockSchedule["id"];
  children: ReactNode;
}
