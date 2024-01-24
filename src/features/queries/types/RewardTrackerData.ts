import type Big from "big.js";

export interface RewardTrackerData {
  rewardTokenAddress: string;
  stakedBalance: Big | null;
  claimableBalance: Big | null;
}
