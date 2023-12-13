import { useSelectedPairIdStore } from "../../protected-perps-page/stores/useSelectedPairIdStore";
import { GeWalletStateProvider } from "../providers/GeWalletStateProvider";

import { GeWalletContent } from "./GeWalletContent";

export const GeWallet = () => {
  const { selectedPairId } = useSelectedPairIdStore();

  return (
    <GeWalletStateProvider pairId={selectedPairId}>
      <GeWalletContent />
    </GeWalletStateProvider>
  );
};
