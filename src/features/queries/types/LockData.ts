import type Big from "big.js";

export interface UnlockSchedule {
  id: string;
  unlockScheduleIndex: number;
  governanceTokenInitUnlock: Big;
  governanceTokenLocked: Big;
  governanceTokenUnlocked: Big;
  penalty: number;
  isPenaltyExist: boolean;
  startTimestamp: number;
  endTimestamp: number;
}

export interface LockData {
  unlockBalance: Big | null;
  unlockSchedules: UnlockSchedule[] | null;
}
