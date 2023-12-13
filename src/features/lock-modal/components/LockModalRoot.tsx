import { LockModalStateProvider } from "../providers/LockModalStateProvider";
import { LockModalTransactionsProvider } from "../providers/LockModalTransactionsProvider";
import { TabType } from "../types/TabType";

import { LockModalContent } from "./LockModalContent";

export const LockModalRoot = () => (
  <LockModalStateProvider defaultTabType={TabType.LOCK}>
    <LockModalTransactionsProvider>
      <LockModalContent />
    </LockModalTransactionsProvider>
  </LockModalStateProvider>
);
