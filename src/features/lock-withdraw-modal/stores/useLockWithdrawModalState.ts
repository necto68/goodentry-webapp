import { useContext } from "react";

import { LockWithdrawModalStateContext } from "../providers/LockWithdrawModalStateProvider";

export const useLockWithdrawModalState = () =>
  useContext(LockWithdrawModalStateContext);
