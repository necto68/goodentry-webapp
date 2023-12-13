import type { useClosePositionTransaction } from "../../transactions/transaction-hooks/useClosePositionTransaction";
import type { useOpenPositionTransaction } from "../../transactions/transaction-hooks/useOpenPositionTransaction";

export interface TradeModalTransactions {
  openPositionTransaction: ReturnType<typeof useOpenPositionTransaction>;
  closePositionTransaction: ReturnType<typeof useClosePositionTransaction>;
}
