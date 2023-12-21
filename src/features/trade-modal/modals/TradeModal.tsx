import { TradeModalContent } from "../components/TradeModalContent";
import { TradeModalTransactionsProvider } from "../providers/TradeModalTransactionsProvider";

export const TradeModal = () => (
  <TradeModalTransactionsProvider>
    <TradeModalContent />
  </TradeModalTransactionsProvider>
);
