import { getPairConfig } from "../../pair/helpers/getPairConfig";

import type { AssetPrices, AssetPricesResponse } from "../types/AssetPrices";

export const assetPricesFetcher = async (
  pairId: string
): Promise<AssetPrices> => {
  const { chartSymbol } = getPairConfig(pairId);

  const tickerUrl = `https://api.binance.com/api/v1/ticker/24hr?symbol=${chartSymbol}`;

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
    priceChange,
    highPrice,
    lowPrice,
  };
};
