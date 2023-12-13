import { constants } from "ethers";

import { queryClient } from "../../shared/constants/queryClient";
import { toBig } from "../../shared/helpers/bigjs";
import { IAaveAToken__factory as ATokenFactory } from "../../smart-contracts/types";
import { areAddressesEqual } from "../../web3/helpers/addresses";
import { getProvider } from "../../web3/helpers/getProvider";
import { NATIVE_COIN_ADDRESS } from "../constants/nativeCoin";
import { isWrappedNativeCoin } from "../helpers/wrappedNativeCoin";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import { basePriceFetcher } from "./basePriceFetcher";
import { baseTokenFetcher } from "./baseTokenFetcher";

import type { ChainId } from "../../web3/types/ChainId";
import type { Token } from "../types/Token";

export const aTokenFetcher = async (
  chainId: ChainId,
  tokenAddress: string,
  spenderAddress?: string,
  account?: string
): Promise<Token> => {
  const provider = getProvider(chainId);

  const aTokenContract = ATokenFactory.connect(tokenAddress, provider);

  const [nativeCoin, underlyingAssetAddress, lendingPoolAddress] =
    await Promise.all([
      queryClient.ensureQueryData(
        getTokenQueryOptions(chainId, NATIVE_COIN_ADDRESS)
      ),
      // eslint-disable-next-line new-cap
      aTokenContract.UNDERLYING_ASSET_ADDRESS(),
      // eslint-disable-next-line new-cap
      aTokenContract.POOL(),
    ]);

  const [underlyingToken, baseToken, price] = await Promise.all([
    queryClient.ensureQueryData(
      getTokenQueryOptions(chainId, underlyingAssetAddress)
    ),
    baseTokenFetcher(chainId, tokenAddress, spenderAddress, account),
    basePriceFetcher(chainId, underlyingAssetAddress),
  ]);

  // replace aToken's symbol with the underlying token's symbol
  // or native coin's symbol
  const symbol = isWrappedNativeCoin(underlyingToken, chainId)
    ? nativeCoin.symbol
    : underlyingToken.symbol;

  // if the spender is the lending pool, we set the allowance to MaxUint256
  // because we don't need to approve the lending pool to spend aToken
  const allowance =
    spenderAddress && areAddressesEqual(lendingPoolAddress, spenderAddress)
      ? toBig(constants.MaxUint256)
      : baseToken.allowance;

  return {
    ...baseToken,
    symbol,
    allowance,
    price,
    underlyingAssetAddress,
  };
};
