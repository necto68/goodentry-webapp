import { useAssetPrices } from "../../protected-perps-page/hooks/useAssetPrices";

import { useTickers } from "./useTickers";

export const useFilteredTickersByPrice = () => {
  const tickers = useTickers();
  const prices = useAssetPrices();

  const areAllTickersLoaded = tickers.every((ticker) => ticker !== undefined);

  if (!areAllTickersLoaded || !prices) {
    // TODO: hide lowerTicker for preventing users to open ITM position
    // return [undefined, undefined];

    return [undefined];
  }

  const { currentPrice } = prices;

  const sortedTickers = Array.from(tickers).sort((a, b) =>
    a && b ? a.strikePrice - b.strikePrice : 0
  );

  const upperTickerIndex = sortedTickers.findIndex(
    (ticker) => ticker && ticker.strikePrice > currentPrice
  );

  // TODO: hide lowerTicker for preventing users to open ITM position
  // const lowerTickerIndex = upperTickerIndex - 1;
  //
  // const [upperTicker, lowerTicker] = [
  //   sortedTickers[upperTickerIndex],
  //   sortedTickers[lowerTickerIndex],
  // ];
  //
  // return [upperTicker, lowerTicker];

  const upperTicker = sortedTickers[upperTickerIndex];

  return [upperTicker];
};
