import { LOCK_PERIOD_DAYS_AMOUNT } from "../constants/penaltyChartPoints";

export const getPenaltyMultiplier = (
  elapsedPeriod: number,
  lockPeriod: number
) => Math.E ** (1.4 * Math.log(1 - elapsedPeriod / lockPeriod));

export const getPenaltyChartPoints = () =>
  Array.from({ length: LOCK_PERIOD_DAYS_AMOUNT + 1 }, (element, index) => ({
    x: index,
    y: getPenaltyMultiplier(index, LOCK_PERIOD_DAYS_AMOUNT),
  }));
