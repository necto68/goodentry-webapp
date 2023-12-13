import { usePair } from "../../protected-perps-page/hooks/usePair";
import { TabType } from "../../trade-panel/types/TabType";
import { useTradeModalState } from "../stores/useTradeModalState";

export const useSwapSourceAddress = () => {
  const { selectedTab } = useTradeModalState();
  const pair = usePair();

  const { token0Address = "", token1Address = "" } = pair ?? {};

  const isLongTab = selectedTab === TabType.LONG;

  return isLongTab ? token1Address : token0Address;
};
