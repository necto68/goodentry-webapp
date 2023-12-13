import { useContext } from "react";

import { LockModalStateContext } from "../providers/LockModalStateProvider";

export const useLockModalState = () => useContext(LockModalStateContext);
