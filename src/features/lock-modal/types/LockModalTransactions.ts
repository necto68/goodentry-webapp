import type { useGovernanceTokenLockTransaction } from "../../transactions/transaction-hooks/useGovernanceTokenLockTransaction";
import type { useGovernanceTokenUnlockTransaction } from "../../transactions/transaction-hooks/useGovernanceTokenUnlockTransaction";

export interface LockModalTransactions {
  lockTransaction: ReturnType<typeof useGovernanceTokenLockTransaction>;
  unlockTransaction: ReturnType<typeof useGovernanceTokenUnlockTransaction>;
}
