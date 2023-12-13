import { useTradePanelState } from "../stores/useTradePanelState";

export const useTickerTokenInputState = () => {
  const { tickerTokenInputState } = useTradePanelState();

  return tickerTokenInputState;
};
