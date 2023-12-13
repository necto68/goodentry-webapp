import { useCallback, useMemo, useState } from "react";

import { getTokenInputError } from "../helpers/getTokenInputError";
import { toInputValueBig } from "../helpers/toInputValueBig";

import { useTokenData } from "./useTokenData";

import type { TokenData } from "../../queries/types/Token";
import type { ChainId } from "../../web3/types/ChainId";
import type { TokenInputState } from "../types/TokenInputState";

export const useTokenInputState = (
  defaultTokens: TokenData[],
  nativeCoinData?: TokenData,
  chainId?: ChainId
): TokenInputState => {
  const [inputValue, setInputValue] = useState("");

  const [tokenData, tokens, setTokenDataAddress] = useTokenData(
    defaultTokens,
    nativeCoinData,
    chainId
  );
  const inputValueBig = toInputValueBig(inputValue);

  const error = getTokenInputError(inputValueBig, tokenData);

  const resetState = useCallback(() => {
    setInputValue("");
    setTokenDataAddress(tokens[0]?.address);
  }, [setInputValue, setTokenDataAddress, tokens]);

  return useMemo(
    () => ({
      tokenData,
      tokens,
      setTokenDataAddress,
      inputValue,
      setInputValue,
      inputValueBig,
      isError: Boolean(error),
      error,
      resetState,
    }),
    [
      tokenData,
      tokens,
      setTokenDataAddress,
      inputValue,
      setInputValue,
      inputValueBig,
      error,
      resetState,
    ]
  );
};
