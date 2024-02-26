import type Big from "big.js";

export interface PairOpenInterest {
  id: string;
  longOpenInterest: Big;
  shortOpenInterest: Big;
  longMaxOpenInterest: Big;
  shortMaxOpenInterest: Big;
}
