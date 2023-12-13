import type { useGovernanceTokenWithdrawTransaction } from "../../transactions/transaction-hooks/useGovernanceTokenWithdrawTransaction";

export interface LockWithdrawModalTransactions {
  withdrawTransaction: ReturnType<typeof useGovernanceTokenWithdrawTransaction>;
}
