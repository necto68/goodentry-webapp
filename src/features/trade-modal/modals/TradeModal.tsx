import { GeWalletStateProvider } from "../../ge-wallet/providers/GeWalletStateProvider";
import { TradeModalContent } from "../components/TradeModalContent";
import { TradeModalTransactionsProvider } from "../providers/TradeModalTransactionsProvider";
import { useTradeModalState } from "../stores/useTradeModalState";

export const TradeModal = () => {
  const { selectedPairId } = useTradeModalState();

  return (
    <GeWalletStateProvider pairId={selectedPairId}>
      <TradeModalTransactionsProvider>
        <TradeModalContent />
      </TradeModalTransactionsProvider>
    </GeWalletStateProvider>
  );
};
