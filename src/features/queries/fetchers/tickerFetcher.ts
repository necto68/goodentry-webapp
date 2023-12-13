import { fromTokenAmount } from "../../input-card/helpers/tokenAmount";
import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { getExp, toBig } from "../../shared/helpers/bigjs";
import {
  IAaveLendingPool__factory as LendingPoolFactory,
  IAaveProtocolDataProvider__factory as ProtocolDataProviderFactory,
  IGoodEntryTokenizableRange__factory as TokenizableRangeFactory,
} from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getATokenQueryOptions } from "../query-options-getters/getATokenQueryOptions";
import { getPairQueryOptions } from "../query-options-getters/getPairQueryOptions";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { Ticker } from "../types/Ticker";

export const tickerFetcher = async (
  pairId: string,
  tickerAddress: string,
  account?: string
): Promise<Ticker> => {
  const {
    chainId,
    addresses: { lendingPool, protocolDataProvider },
  } = getPairConfig(pairId);

  const provider = getProvider(chainId);

  const lendingPoolContract = LendingPoolFactory.connect(lendingPool, provider);
  const protocolDataProviderContract = ProtocolDataProviderFactory.connect(
    protocolDataProvider,
    provider
  );
  const tokenizableRangeContract = TokenizableRangeFactory.connect(
    tickerAddress,
    provider
  );

  const [
    tickerToken,
    { variableDebtTokenAddress, currentVariableBorrowRate },
    { availableLiquidity: rawAvailableTickerTokenLiquidity },
    { token0Address, token1Address },
  ] = await Promise.all([
    queryClient.fetchQuery(
      getTokenQueryOptions(chainId, tickerAddress, undefined, account)
    ),
    lendingPoolContract.getReserveData(tickerAddress),
    protocolDataProviderContract.getReserveData(tickerAddress),
    queryClient.ensureQueryData(getPairQueryOptions(pairId)),
  ]);

  const [
    debtToken,
    rawTokenAmounts,
    rawTokenAmountsExcludingFees,
    token0,
    token1,
  ] = await Promise.all([
    queryClient.fetchQuery(
      getATokenQueryOptions(
        chainId,
        variableDebtTokenAddress,
        undefined,
        account
      )
    ),
    tokenizableRangeContract.getTokenAmounts(
      tickerToken.totalSupply.mul(getExp(tickerToken.decimals)).toString()
    ),
    tokenizableRangeContract.getTokenAmountsExcludingFees(
      tickerToken.totalSupply.mul(getExp(tickerToken.decimals)).toString()
    ),
    queryClient.ensureQueryData(getTokenQueryOptions(chainId, token0Address)),
    queryClient.ensureQueryData(getTokenQueryOptions(chainId, token1Address)),
  ]);

  const tokenAmounts = {
    amount0: fromTokenAmount(toBig(rawTokenAmounts.token0Amount), token0),
    amount1: fromTokenAmount(toBig(rawTokenAmounts.token1Amount), token1),
  };

  const tokenAmountsExcludingFees = {
    amount0: fromTokenAmount(
      toBig(rawTokenAmountsExcludingFees.token0Amount),
      token0
    ),

    amount1: fromTokenAmount(
      toBig(rawTokenAmountsExcludingFees.token1Amount),
      token1
    ),
  };

  const tickerDivisor = getExp(tickerToken.decimals);

  // calculate available liquidity in USDC terms
  const availableTickerTokenLiquidity = toBig(
    rawAvailableTickerTokenLiquidity
  ).div(tickerDivisor);
  const availableLiquidity = availableTickerTokenLiquidity.mul(
    tickerToken.price
  );

  const borrowRate = toBig(currentVariableBorrowRate).div(1e27);
  const borrowRatePerHour = borrowRate.div(365).div(24).toNumber();

  const { name } = tickerToken;
  const nameArray = name.split(" ");
  const rawSymbol = nameArray.at(-2) ?? "";
  const range = nameArray.at(-1)?.split("-").map(Number) ?? [0, 0];

  const strikePrice = toBig(range[0]).add(range[1]).div(2).toNumber();

  // replace symbol only for WETH
  const symbol = rawSymbol === "WETH" ? "ETH" : rawSymbol;

  return {
    id: name,
    address: tickerAddress,
    pairId,
    symbol,
    strikePrice,
    tickerToken,
    debtToken,
    borrowRatePerHour,
    availableLiquidity,
    tokenAmounts,
    tokenAmountsExcludingFees,
  };
};
