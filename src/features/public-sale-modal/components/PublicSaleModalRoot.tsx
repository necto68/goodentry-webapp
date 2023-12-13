import { PublicSaleModalStateProvider } from "../providers/PublicSaleModalStateProvider";
import { PublicSaleModalTransactionsProvider } from "../providers/PublicSaleModalTransactionsProvider";

import { PublicSaleModalContent } from "./PublicSaleModalContent";

export const PublicSaleModalRoot = () => (
  <PublicSaleModalStateProvider>
    <PublicSaleModalTransactionsProvider>
      <PublicSaleModalContent />
    </PublicSaleModalTransactionsProvider>
  </PublicSaleModalStateProvider>
);
