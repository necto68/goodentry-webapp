import { useEffect, useState } from "react";

import { isWrappedNativeCoin } from "../../queries/helpers/wrappedNativeCoin";

import type { TokenData } from "../../queries/types/Token";
import type { ChainId } from "../../web3/types/ChainId";

export const useTokenData = (
  defaultTokens: TokenData[],
  nativeCoinData?: TokenData,
  chainId?: ChainId
) => {
  const wrappedNativeCoinDataIndex = defaultTokens.findIndex((tokenData) =>
    tokenData && chainId ? isWrappedNativeCoin(tokenData, chainId) : false
  );

  const shouldReplaceWrappedNativeCoinData =
    nativeCoinData && wrappedNativeCoinDataIndex >= 0;
  const tokensWithNativeCoin = [
    ...defaultTokens.slice(0, wrappedNativeCoinDataIndex),
    nativeCoinData,
    ...defaultTokens.slice(wrappedNativeCoinDataIndex + 1),
  ];

  const tokens = shouldReplaceWrappedNativeCoinData
    ? tokensWithNativeCoin
    : defaultTokens;

  const defaultTokenDataAddress = tokens[0]?.address;

  const [tokenDataAddress, setTokenDataAddress] = useState(
    defaultTokenDataAddress
  );

  useEffect(() => {
    setTokenDataAddress(defaultTokenDataAddress);
  }, [defaultTokenDataAddress]);

  const tokenData = tokens.find((token) => token?.address === tokenDataAddress);

  return [tokenData, tokens, setTokenDataAddress] as const;
};
