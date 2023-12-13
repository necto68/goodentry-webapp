import type { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import type { useLendingPoolDepositTransaction } from "../../transactions/transaction-hooks/useLendingPoolDepositTransaction";
import type { useLendingPoolWithdrawTransaction } from "../../transactions/transaction-hooks/useLendingPoolWithdrawTransaction";

export interface LendingPoolModalTransactions {
  tokenApproveTransaction: ReturnType<typeof useTokenApproveTransaction>;
  depositTransaction: ReturnType<typeof useLendingPoolDepositTransaction>;
  withdrawTransaction: ReturnType<typeof useLendingPoolWithdrawTransaction>;
}
