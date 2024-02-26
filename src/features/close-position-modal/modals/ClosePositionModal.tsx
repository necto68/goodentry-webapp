import { ClosePositionModalContent } from "../components/ClosePositionModalContent";
import { ClosePositionModalTransactionsProvider } from "../providers/ClosePositionModalTransactionsProvider";

export const ClosePositionModal = () => (
  <ClosePositionModalTransactionsProvider>
    <ClosePositionModalContent />
  </ClosePositionModalTransactionsProvider>
);
