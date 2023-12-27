import { useTradePanelState } from "../stores/useTradePanelState";

export const useQuoteTokenInputState = () => {
  const { quoteTokenInputState } = useTradePanelState();

  return quoteTokenInputState;
};
