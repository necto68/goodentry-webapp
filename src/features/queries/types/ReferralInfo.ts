import type { ChainId } from "../../web3/types/ChainId";
import type Big from "big.js";

export interface ReferralHistoryItem {
  reward: Big;
  timestamp: number;
  token: string;
  transactionHash: string;
  chainId: ChainId;
}
export interface ReferralInfo {
  totalRewards: number;
  myReferralsCount: number;
  myReferralCode: string;
  referrerCode: string;
  referralHistory: ReferralHistoryItem[];
}
