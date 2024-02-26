import type { useClosePositionTransaction } from "../../transactions/transaction-hooks/useClosePositionTransaction";

export interface ClosePositionModalTransactions {
  closePositionTransaction: ReturnType<typeof useClosePositionTransaction>;
}
