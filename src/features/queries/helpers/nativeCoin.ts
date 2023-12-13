import { areAddressesEqual } from "../../web3/helpers/addresses";
import { NATIVE_COIN_ADDRESS } from "../constants/nativeCoin";

import type { Token } from "../types/Token";

export const isNativeCoinAddress = (tokenAddress: string): boolean =>
  areAddressesEqual(tokenAddress, NATIVE_COIN_ADDRESS);

export const isNativeCoin = (tokenData: Token): boolean =>
  isNativeCoinAddress(tokenData.address);
