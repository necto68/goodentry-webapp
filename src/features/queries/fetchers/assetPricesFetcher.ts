import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { queryClient } from "../../shared/constants/queryClient";
import { IUniswapV3Pool__factory as PoolFactory } from "../../smart-contracts/types";
import { getProvider } from "../../web3/helpers/getProvider";
import { getPairQueryOptions } from "../query-options-getters/getPairQueryOptions";
import { getTokenQueryOptions } from "../query-options-getters/getTokenQueryOptions";

import type { AssetPrices, AssetPricesResponse } from "../types/AssetPrices";

export const assetPricesFetcher = async (
  pairId: string
): Promise<AssetPrices> => {
  const {
    chainId,
    chartSymbol,
    addresses: { uniswapPool },
  } = getPairConfig(pairId);

  const provider = getProvider(chainId);

  const poolContract = PoolFactory.connect(uniswapPool, provider);

  const tickerUrl = `https://api.binance.com/api/v1/ticker/24hr?symbol=${chartSymbol}`;

  const [{ token0Address, token1Address }, { sqrtPriceX96 }] =
    await Promise.all([
      queryClient.ensureQueryData(getPairQueryOptions(pairId)),
      poolContract.slot0(),
    ]);

  const [token0, token1] = await Promise.all([
    queryClient.ensureQueryData(getTokenQueryOptions(chainId, token0Address)),
    queryClient.ensureQueryData(getTokenQueryOptions(chainId, token1Address)),
  ]);

  const decimalsDiff = token0.decimals - token1.decimals;

  const currentPrice =
    sqrtPriceX96
      .pow(2)
      .mul(10 ** decimalsDiff)
      .shr(187)
      .toNumber() / 32;

  const response = await fetch(tickerUrl, { credentials: "omit" }).catch(
    () => null
  );
  const json = response
    ? ((await response.json()) as AssetPricesResponse)
    : null;

  const {
    priceChangePercent: rawPriceChangePercent,
    highPrice: rawHighPrice,
    lowPrice: rawLowPrice,
  } = json ?? {};

  const priceChange = rawPriceChangePercent
    ? Number(rawPriceChangePercent) / 100
    : null;
  const highPrice = rawHighPrice ? Number(rawHighPrice) : null;
  const lowPrice = rawLowPrice ? Number(rawLowPrice) : null;

  return {
    id: pairId,
    currentPrice,
    priceChange,
    highPrice,
    lowPrice,
  };
};
