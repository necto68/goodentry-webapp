import Big from "big.js";

import type { BigNumber } from "ethers";

export const toBig = (value: BigNumber | number | string): Big =>
  new Big(value.toString());

export const getExp = (value: number): Big => new Big(10).pow(value);

export const getZero = () => new Big(0);
