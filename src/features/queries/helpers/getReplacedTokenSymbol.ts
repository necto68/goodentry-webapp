import { areAddressesEqual } from "../../web3/helpers/addresses";
import { ChainId } from "../../web3/types/ChainId";
import {
  bridgedUSDCAddress,
  wrappedETHAddress,
} from "../constants/tokenAdresses";

export const getReplacedTokenSymbol = (
  tokenAddress: string,
  chainId: ChainId
) => {
  if (
    areAddressesEqual(tokenAddress, bridgedUSDCAddress) &&
    chainId === ChainId.ARBITRUM
  ) {
    return "USDC.e";
  }

  if (
    areAddressesEqual(tokenAddress, wrappedETHAddress) &&
    chainId === ChainId.ARBITRUM
  ) {
    return "ETH";
  }

  return null;
};
