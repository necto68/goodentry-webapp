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
import { defaultLeverageStep } from "../constants/leverageSteps";
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
  quoteTokenInputState: defaultTokenInputState,
  selectedLeverage: defaultLeverageStep,
  setSelectedLeverage: () => undefined,
});

export const TradePanelStateProvider: FC<TradePanelStateProviderProps> = ({
  children,
}) => {
  const { selectedPairId: storeSelectedPairId } = useSelectedPairIdStore();

  const [rawSelectedPairId, setRawSelectedPairId] =
    useState(storeSelectedPairId);
  const [rawSelectedTab, setRawSelectedTab] = useState(TabType.LONG);
  const [selectedLeverage, setSelectedLeverage] = useState(defaultLeverageStep);

  const quoteTokenInputState = useTokenInputState([]);

  const selectedPairId = rawSelectedPairId;

  const selectedTab = rawSelectedTab;
  const setSelectedTab = useCallback(
    (nextSelectedTab: TradePanelState["selectedTab"]) => {
      quoteTokenInputState.resetState();
      setSelectedLeverage(defaultLeverageStep);
      setRawSelectedTab(nextSelectedTab);
    },
    [quoteTokenInputState, setRawSelectedTab]
  );

  // TODO: remove this useEffect
  //  when we have a better way to manage state for selectedPairId
  useEffect(() => {
    if (selectedPairId !== storeSelectedPairId) {
      setRawSelectedPairId(storeSelectedPairId);
      setRawSelectedTab(TabType.LONG);

      quoteTokenInputState.resetState();
      setSelectedLeverage(defaultLeverageStep);
    }
  }, [selectedPairId, storeSelectedPairId, quoteTokenInputState]);

  const value = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      selectedPairId,
      quoteTokenInputState,
      selectedLeverage,
      setSelectedLeverage,
    }),
    [
      selectedTab,
      setSelectedTab,
      selectedPairId,
      quoteTokenInputState,
      selectedLeverage,
      setSelectedLeverage,
    ]
  );

  return (
    <TradePanelStateContext.Provider value={value}>
      {children}
    </TradePanelStateContext.Provider>
  );
};
