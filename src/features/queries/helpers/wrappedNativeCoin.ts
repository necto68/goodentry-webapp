import { areAddressesEqual } from "../../web3/helpers/addresses";
import { getWrappedNativeCoinAddress } from "../../web3/helpers/getWrappedNativeCoinAddress";

import type { ChainId } from "../../web3/types/ChainId";
import type { Token } from "../types/Token";

export const isWrappedNativeCoinAddress = (
  tokenAddress: string,
  chainId: ChainId
): boolean =>
  areAddressesEqual(tokenAddress, getWrappedNativeCoinAddress(chainId));

export const isWrappedNativeCoin = (
  tokenData: Token,
  chainId: ChainId
): boolean => isWrappedNativeCoinAddress(tokenData.address, chainId);
