import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { defaultTokenInputState } from "../../input-card/constants/defaultTokenInputState";
import { useTokenInputState } from "../../input-card/hooks/useTokenInputState";
import { usePairIdStore } from "../../protected-perps-page/stores/usePairIdStore";
import { defaultLeverageStep } from "../constants/leverageSteps";
import { useTradePanelQueries } from "../hooks/useTradePanelQueries";
import { PositionSide } from "../types/PositionSide";

import type { TradePanelState } from "../types/TradePanelState";
import type { ReactNode, FC } from "react";

interface TradePanelStateProviderProps {
  readonly children: ReactNode;
}

export const TradePanelStateContext = createContext<TradePanelState>({
  positionSide: PositionSide.LONG,
  setPositionSide: () => undefined,
  pairId: "",
  quoteTokenInputState: defaultTokenInputState,
  leverage: defaultLeverageStep,
  setLeverage: () => undefined,
});

export const TradePanelStateProvider: FC<TradePanelStateProviderProps> = ({
  children,
}) => {
  const { pairId: storePairId } = usePairIdStore();

  const [rawPairId, setRawPairId] = useState(storePairId);
  const [rawPositionSide, setRawPositionSide] = useState(PositionSide.LONG);
  const [leverage, setLeverage] = useState(defaultLeverageStep);

  const { quoteTokenQuery } = useTradePanelQueries(rawPairId);
  const quoteTokenData = quoteTokenQuery.data;

  const quoteTokenInputState = useTokenInputState([quoteTokenData]);

  const pairId = rawPairId;

  const positionSide = rawPositionSide;
  const setPositionSide = useCallback(
    (nextPositionSide: TradePanelState["positionSide"]) => {
      quoteTokenInputState.resetState();
      setLeverage(defaultLeverageStep);
      setRawPositionSide(nextPositionSide);
    },
    [quoteTokenInputState, setRawPositionSide]
  );

  // TODO: remove this useEffect
  //  when we have a better way to manage state for pairId
  useEffect(() => {
    if (pairId !== storePairId) {
      setRawPairId(storePairId);
      setRawPositionSide(PositionSide.LONG);

      quoteTokenInputState.resetState();
      setLeverage(defaultLeverageStep);
    }
  }, [pairId, storePairId, quoteTokenInputState]);

  const value = useMemo(
    () => ({
      positionSide,
      setPositionSide,
      pairId,
      quoteTokenInputState,
      leverage,
      setLeverage,
    }),
    [
      positionSide,
      setPositionSide,
      pairId,
      quoteTokenInputState,
      leverage,
      setLeverage,
    ]
  );

  return (
    <TradePanelStateContext.Provider value={value}>
      {children}
    </TradePanelStateContext.Provider>
  );
};
