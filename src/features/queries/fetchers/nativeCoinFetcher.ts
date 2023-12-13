import { constants } from "ethers";

import { toBig, getExp, getZero } from "../../shared/helpers/bigjs";
import { getChainConfig } from "../../web3/helpers/getChainConfig";
import { getProvider } from "../../web3/helpers/getProvider";
import { getWrappedNativeCoinAddress } from "../../web3/helpers/getWrappedNativeCoinAddress";
import { NATIVE_COIN_ADDRESS } from "../constants/nativeCoin";

import { basePriceFetcher } from "./basePriceFetcher";

import type { ChainId } from "../../web3/types/ChainId";
import type { Token } from "../types/Token";

export const nativeCoinFetcher = async (
  chainId: ChainId,
  account?: string
): Promise<Token> => {
  const provider = getProvider(chainId);

  const address = NATIVE_COIN_ADDRESS;
  const {
    nativeCurrency: { symbol },
  } = getChainConfig(chainId);

  const wrappedNativeCoinAddress = getWrappedNativeCoinAddress(chainId);

  const [rawBalance, price] = await Promise.all([
    account ? provider.getBalance(account).then(toBig) : null,
    basePriceFetcher(chainId, wrappedNativeCoinAddress),
  ]);

  const name = symbol;
  const decimals = 18;
  const divisor = getExp(decimals);

  const balance = rawBalance ? rawBalance.div(divisor) : null;
  const allowance = account ? toBig(constants.MaxUint256) : getZero();
  const totalSupply = toBig(constants.MaxUint256);

  return {
    address,
    symbol,
    name,
    decimals,
    balance,
    allowance,
    totalSupply,
    price,
  };
};
