import { PublicSaleStatus } from "../../queries/types/PublicSaleData";

import type { PublicSaleData } from "../../queries/types/PublicSaleData";

export const getTimerTitle = (
  status: PublicSaleData["status"],
  isPaused: PublicSaleData["isPaused"]
) => {
  if (isPaused) {
    return "Fair Sale is Paused";
  }

  if (status === PublicSaleStatus.NOT_STARTED) {
    return "Fair Sale hasn't Started";
  }

  if (status === PublicSaleStatus.IN_PROGRESS) {
    return "Fair Sale is Live";
  }

  return "Fair Sale has Ended";
};
