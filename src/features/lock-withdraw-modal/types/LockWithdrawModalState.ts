import type { UnlockSchedule } from "../../queries/types/LockData";

export interface LockWithdrawModalState {
  selectedUnlockSchedule: UnlockSchedule | null;
}
