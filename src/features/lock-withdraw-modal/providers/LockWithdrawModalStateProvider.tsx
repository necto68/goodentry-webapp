import { createContext, useMemo } from "react";

import { useLockData } from "../../lock-page/hooks/useLockData";

import type { LockWithdrawModalState } from "../types/LockWithdrawModalState";
import type { LockWithdrawModalStateProviderProps } from "../types/LockWithdrawModalStateProviderProps";
import type { FC } from "react";

export const LockWithdrawModalStateContext =
  createContext<LockWithdrawModalState>({
    selectedUnlockSchedule: null,
  });

export const LockWithdrawModalStateProvider: FC<
  LockWithdrawModalStateProviderProps
> = ({ unlockScheduleId, children }) => {
  const { unlockSchedules } = useLockData() ?? {};

  const selectedUnlockSchedule = useMemo(
    () =>
      unlockSchedules?.find((schedule) => schedule.id === unlockScheduleId) ??
      null,
    [unlockSchedules, unlockScheduleId]
  );

  const value = useMemo(
    () => ({
      selectedUnlockSchedule,
    }),
    [selectedUnlockSchedule]
  );

  return (
    <LockWithdrawModalStateContext.Provider value={value}>
      {children}
    </LockWithdrawModalStateContext.Provider>
  );
};
