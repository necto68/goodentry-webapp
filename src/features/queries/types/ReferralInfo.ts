import type { ChainId } from "../../web3/types/ChainId";
import type { BigNumber } from "ethers";

export type EmptyReferralInfo = "0x0000000000000000000000000000000000000000";
export const emptyReferralInfo: EmptyReferralInfo =
  "0x0000000000000000000000000000000000000000";

export interface ReferralInfoABI {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  name: EmptyReferralInfo | string;
  referreesLength: BigNumber;
}

export interface ReferralHistoryItem {
  reward: number;
  timestamp: number;
  token: string;
  transactionHash: string;
  chainId: ChainId;
}
export interface ReferralInfo {
  myReferralsCount: number;
  myReferralCode: string;
  referrerCode: string;
  referralHistory: ReferralHistoryItem[];
}
