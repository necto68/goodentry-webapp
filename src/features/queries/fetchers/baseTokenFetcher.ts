import { toBig, getExp, getZero } from "../../shared/helpers/bigjs";
import { IERC20__factory as ERC20Factory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getReplacedTokenSymbol } from "../helpers/getReplacedTokenSymbol";

import type { ChainId } from "../../web3/types/ChainId";
import type { BaseToken } from "../types/Token";

export const baseTokenFetcher = async (
  chainId: ChainId,
  tokenAddress: string,
  spenderAddress?: string,
  account?: string
): Promise<BaseToken> => {
  const provider = getProvider(chainId);
  const address = tokenAddress;

  const tokenContract = ERC20Factory.connect(address, provider);

  const replacedTokenSymbol = getReplacedTokenSymbol(tokenAddress, chainId);

  const [symbol, name, decimals, rawBalance, rawAllowance, rawTotalSupply] =
    await Promise.all([
      replacedTokenSymbol ?? tokenContract.symbol(),
      tokenContract.name(),
      tokenContract.decimals(),
      account ? tokenContract.balanceOf(account).then(toBig) : null,
      spenderAddress && account
        ? tokenContract.allowance(account, spenderAddress).then(toBig)
        : getZero(),
      tokenContract.totalSupply().then(toBig),
    ]);

  const divisor = getExp(decimals);

  const balance = rawBalance ? rawBalance.div(divisor) : null;
  const allowance = rawAllowance.div(divisor);
  const totalSupply = rawTotalSupply.div(divisor);

  return {
    address,
    symbol,
    name,
    decimals,
    balance,
    allowance,
    totalSupply,
  };
};
