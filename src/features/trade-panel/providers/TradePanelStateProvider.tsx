import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { usePairLendingPool } from "../../ge-wallet/hooks/usePairLendingPool";
import { defaultTokenInputState } from "../../input-card/constants/defaultTokenInputState";
import { useTokenInputState } from "../../input-card/hooks/useTokenInputState";
import { useSelectedPairIdStore } from "../../protected-perps-page/stores/useSelectedPairIdStore";
import { getTickerAsTokenData } from "../helpers/getTickerAsTokenData";
import { useFilteredTickersByPrice } from "../hooks/useFilteredTickersByPrice";
import { useTicker } from "../hooks/useTicker";
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
  selectedTickerAddress: null,
  setSelectedTickerAddress: () => undefined,
  tickerTokenInputState: defaultTokenInputState,
});

export const TradePanelStateProvider: FC<TradePanelStateProviderProps> = ({
  children,
}) => {
  const { selectedPairId: storeSelectedPairId } = useSelectedPairIdStore();

  const [rawSelectedPairId, setRawSelectedPairId] =
    useState(storeSelectedPairId);
  const [rawSelectedTab, setRawSelectedTab] = useState(TabType.LONG);
  const [rawSelectedTickerAddress, setRawSelectedTickerAddress] = useState<
    string | null
  >(null);

  const ticker = useTicker(rawSelectedPairId, rawSelectedTickerAddress);
  const lendingPool = usePairLendingPool(rawSelectedPairId);
  const tickerToken = getTickerAsTokenData(ticker, lendingPool);

  const tickerTokenInputState = useTokenInputState([tickerToken]);

  const filteredTickers = useFilteredTickersByPrice();
  const firstTickerAddress = filteredTickers[0]?.address;

  const selectedPairId = rawSelectedPairId;

  const selectedTab = rawSelectedTab;
  const setSelectedTab = useCallback(
    (nextSelectedTab: TradePanelState["selectedTab"]) => {
      tickerTokenInputState.resetState();
      setRawSelectedTab(nextSelectedTab);
    },
    [tickerTokenInputState, setRawSelectedTab]
  );

  const selectedTickerAddress = rawSelectedTickerAddress;
  const setSelectedTickerAddress = useCallback(
    (nextSelectedTickerAddress: TradePanelState["selectedTickerAddress"]) => {
      tickerTokenInputState.resetState();
      setRawSelectedTickerAddress(nextSelectedTickerAddress);
    },
    [tickerTokenInputState, setRawSelectedTickerAddress]
  );

  // TODO: remove this useEffect
  //  when we have a better way to manage state for selectedPairId
  useEffect(() => {
    if (selectedPairId !== storeSelectedPairId) {
      setRawSelectedPairId(storeSelectedPairId);
      setRawSelectedTab(TabType.LONG);
      setRawSelectedTickerAddress(null);

      tickerTokenInputState.resetState();
    }
  }, [selectedPairId, storeSelectedPairId, tickerTokenInputState]);

  useEffect(() => {
    if (!rawSelectedTickerAddress && firstTickerAddress) {
      setSelectedTickerAddress(firstTickerAddress);
    }
  }, [rawSelectedTickerAddress, firstTickerAddress, setSelectedTickerAddress]);

  const value = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      selectedPairId,
      selectedTickerAddress,
      setSelectedTickerAddress,
      tickerTokenInputState,
    }),
    [
      selectedTab,
      setSelectedTab,
      selectedPairId,
      selectedTickerAddress,
      setSelectedTickerAddress,
      tickerTokenInputState,
    ]
  );

  return (
    <TradePanelStateContext.Provider value={value}>
      {children}
    </TradePanelStateContext.Provider>
  );
};
