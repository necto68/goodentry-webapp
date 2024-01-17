import { OpenPositionModalContent } from "../components/OpenPositionModalContent";
import { OpenPositionModalTransactionsProvider } from "../providers/OpenPositionModalTransactionsProvider";

export const OpenPositionModal = () => (
  <OpenPositionModalTransactionsProvider>
    <OpenPositionModalContent />
  </OpenPositionModalTransactionsProvider>
);
