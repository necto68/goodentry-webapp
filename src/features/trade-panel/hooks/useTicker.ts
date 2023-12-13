import { useTickerQuery } from "../../queries/hooks/useTickerQuery";

export const useTicker = (pairId: string, tickerAddress: string | null) => {
  const tickerQuery = useTickerQuery({ pairId, tickerAddress });

  return tickerQuery.data;
};
