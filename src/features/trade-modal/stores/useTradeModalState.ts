import { useModal } from "../../shared/modal/hooks/useModal";

import type { TradeModalState } from "../types/TradeModalState";

export const useTradeModalState = () => {
  const { modalState } = useModal();

  return modalState as unknown as TradeModalState;
};
