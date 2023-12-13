import { LockWithdrawModalStateProvider } from "../providers/LockWithdrawModalStateProvider";
import { LockWithdrawModalTransactionsProvider } from "../providers/LockWithdrawModalTransactionsProvider";

import { LockWithdrawModalContent } from "./LockWithdrawModalContent";

import type { UnlockSchedule } from "../../queries/types/LockData";
import type { FC } from "react";

interface LockWithdrawModalRootProps {
  readonly unlockScheduleId: UnlockSchedule["id"];
}

export const LockWithdrawModalRoot: FC<LockWithdrawModalRootProps> = ({
  unlockScheduleId,
}) => (
  <LockWithdrawModalStateProvider unlockScheduleId={unlockScheduleId}>
    <LockWithdrawModalTransactionsProvider>
      <LockWithdrawModalContent />
    </LockWithdrawModalTransactionsProvider>
  </LockWithdrawModalStateProvider>
);
