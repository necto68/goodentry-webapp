import { isPositionSideLong } from "./isPositionSideLong";

import type { PositionSide } from "../types/PositionSide";

export const getPositionSideTitle = (positionSide: PositionSide) =>
  isPositionSideLong(positionSide) ? "Long" : "Short";
