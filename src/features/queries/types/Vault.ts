import type { ChainId } from "../../web3/types/ChainId";
import type Big from "big.js";

export interface Vault {
  id: string;
  chainId: ChainId;
  address: string;
  totalValueLocked: Big;
  totalValueLockedCap: Big;
  isMaxCapReached: boolean;
  fee0: number;
  fee1: number;

  supplyRate: number;
  feesRate: number;
  totalAnnualPercentageYield: number;
  statsDivisor: Big;
}
