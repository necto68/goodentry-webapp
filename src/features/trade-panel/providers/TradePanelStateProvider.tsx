import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { defaultTokenInputState } from "../../input-card/constants/defaultTokenInputState";
import { useTokenInputState } from "../../input-card/hooks/useTokenInputState";
import { useSelectedPairIdStore } from "../../protected-perps-page/stores/useSelectedPairIdStore";
import { TabType } from "../types/TabType";

import type { TradePanelState } from "../types/TradePanelState";
import type { ReactNode, FC } from "react";

interface TradePanelStateProviderProps {
  readonly children: ReactNode;
}

export const TradePanelStateContext = createContext<TradePanelState>({
  selectedTab: TabType.LONG,
  setSelectedTab: () => undefined,
  selectedPairId: "",
  tickerTokenInputState: defaultTokenInputState,
});

export const TradePanelStateProvider: FC<TradePanelStateProviderProps> = ({
  children,
}) => {
  const { selectedPairId: storeSelectedPairId } = useSelectedPairIdStore();

  const [rawSelectedPairId, setRawSelectedPairId] =
    useState(storeSelectedPairId);
  const [rawSelectedTab, setRawSelectedTab] = useState(TabType.LONG);

  const tickerTokenInputState = useTokenInputState([]);

  const selectedPairId = rawSelectedPairId;

  const selectedTab = rawSelectedTab;
  const setSelectedTab = useCallback(
    (nextSelectedTab: TradePanelState["selectedTab"]) => {
      tickerTokenInputState.resetState();
      setRawSelectedTab(nextSelectedTab);
    },
    [tickerTokenInputState, setRawSelectedTab]
  );

  // TODO: remove this useEffect
  //  when we have a better way to manage state for selectedPairId
  useEffect(() => {
    if (selectedPairId !== storeSelectedPairId) {
      setRawSelectedPairId(storeSelectedPairId);
      setRawSelectedTab(TabType.LONG);

      tickerTokenInputState.resetState();
    }
  }, [selectedPairId, storeSelectedPairId, tickerTokenInputState]);

  const value = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      selectedPairId,
      tickerTokenInputState,
    }),
    [selectedTab, setSelectedTab, selectedPairId, tickerTokenInputState]
  );

  return (
    <TradePanelStateContext.Provider value={value}>
      {children}
    </TradePanelStateContext.Provider>
  );
};
