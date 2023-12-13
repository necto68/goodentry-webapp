import type Big from "big.js";

export interface AirdropData {
  airdropAmount: Big | null;
  airdropProof: string[] | null;
  isAirdropClaimable: boolean;
}
