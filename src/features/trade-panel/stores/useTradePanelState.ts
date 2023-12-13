import { useContext } from "react";

import { TradePanelStateContext } from "../providers/TradePanelStateProvider";

export const useTradePanelState = () => useContext(TradePanelStateContext);
