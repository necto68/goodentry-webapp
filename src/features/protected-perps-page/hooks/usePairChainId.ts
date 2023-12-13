import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useSelectedPairIdStore } from "../stores/useSelectedPairIdStore";

export const usePairChainId = () => {
  const { selectedPairId } = useSelectedPairIdStore();

  const { chainId } = getPairConfig(selectedPairId);

  return chainId;
};
