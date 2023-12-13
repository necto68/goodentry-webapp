import type { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import type { useCrowdSaleDepositTransaction } from "../../transactions/transaction-hooks/useCrowdSaleDepositTransaction";

export interface PublicSaleModalTransactions {
  tokenApproveTransaction: ReturnType<typeof useTokenApproveTransaction>;
  depositTransaction: ReturnType<typeof useCrowdSaleDepositTransaction>;
}
