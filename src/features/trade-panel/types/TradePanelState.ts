import type { PositionSide } from "./PositionSide";
import type { TokenInputState } from "../../input-card/types/TokenInputState";
import type { PairConfig } from "../../pair/types/PairConfig";

export interface TradePanelState {
  positionSide: PositionSide;
  setPositionSide: (positionSide: PositionSide) => void;
  pairId: PairConfig["id"];
  quoteTokenInputState: TokenInputState;
  leverage: number;
  setLeverage: (leverage: number) => void;
}
