import type { useTokenApproveTransaction } from "../../transactions/hooks/useTokenApproveTransaction";
import type { useClosePositionTransaction } from "../../transactions/transaction-hooks/useClosePositionTransaction";
import type { useOpenPositionTransaction } from "../../transactions/transaction-hooks/useOpenPositionTransaction";

export interface OpenPositionModalTransactions {
  tokenApproveTransaction: ReturnType<typeof useTokenApproveTransaction>;
  openPositionTransaction: ReturnType<typeof useOpenPositionTransaction>;
  closePositionTransaction: ReturnType<typeof useClosePositionTransaction>;
}
