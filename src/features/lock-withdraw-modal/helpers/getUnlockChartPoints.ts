import { LOCK_PERIOD_DAYS_AMOUNT } from "../../lock-page/constants/penaltyChartPoints";
import { getPenaltyMultiplier } from "../../lock-page/helpers/getPenaltyChartPoints";

import type { UnlockSchedule } from "../../queries/types/LockData";

const millisecondsInDay = 1000 * 60 * 60 * 24;

export const getUnlockChartPoints = (
  governanceTokenInitUnlock: UnlockSchedule["governanceTokenInitUnlock"],
  startTimestamp: UnlockSchedule["startTimestamp"]
) =>
  Array.from({ length: LOCK_PERIOD_DAYS_AMOUNT + 1 }, (element, index) => {
    const timestamp = startTimestamp + index * millisecondsInDay;
    const unlockAmount = governanceTokenInitUnlock.mul(
      1 - getPenaltyMultiplier(index, LOCK_PERIOD_DAYS_AMOUNT)
    );

    return {
      x: timestamp,
      y: unlockAmount.toNumber(),
    };
  });
