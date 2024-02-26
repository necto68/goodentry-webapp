import { PositionSide } from "../types/PositionSide";

export const isPositionSideLong = (positionSide: PositionSide) =>
  positionSide === PositionSide.LONG;
