import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { usePair } from "../../protected-perps-page/hooks/usePair";
import { NATIVE_COIN_ADDRESS } from "../../queries/constants/nativeCoin";
import { isWrappedNativeCoinAddress } from "../../queries/helpers/wrappedNativeCoin";
import { useATokenQuery } from "../../queries/hooks/useATokenQuery";
import { useLendingPoolQuery } from "../../queries/hooks/useLendingPoolQuery";
import { useTokenQuery } from "../../queries/hooks/useTokenQuery";

export const useLendingPoolModalQueries = (
  pairId: string,
  lendingPoolAddress: string
) => {
  const { chainId } = getPairConfig(pairId);

  const pair = usePair(pairId);
  const lendingPoolQuery = useLendingPoolQuery({ pairId, lendingPoolAddress });

  const { token0Address = "", token1Address = "" } = pair ?? {};
  const {
    aToken0Address = "",
    aToken1Address = "",
    gatewayAddress = "",
  } = lendingPoolQuery.data ?? {};

  const nativeCoinQuery = useTokenQuery({
    chainId,
    tokenAddress: NATIVE_COIN_ADDRESS,
  });

  const token0Query = useTokenQuery({
    chainId,
    tokenAddress: token0Address,
    spenderAddress: lendingPoolAddress,
  });

  const token1Query = useTokenQuery({
    chainId,
    tokenAddress: token1Address,
    spenderAddress: lendingPoolAddress,
  });

  const aToken0Query = useATokenQuery({
    chainId,
    tokenAddress: aToken0Address,

    spenderAddress: isWrappedNativeCoinAddress(token0Address, chainId)
      ? gatewayAddress
      : lendingPoolAddress,
  });

  const aToken1Query = useATokenQuery({
    chainId,
    tokenAddress: aToken1Address,

    spenderAddress: isWrappedNativeCoinAddress(token1Address, chainId)
      ? gatewayAddress
      : lendingPoolAddress,
  });

  return {
    lendingPoolQuery,
    nativeCoinQuery,
    token0Query,
    token1Query,
    aToken0Query,
    aToken1Query,
  };
};
