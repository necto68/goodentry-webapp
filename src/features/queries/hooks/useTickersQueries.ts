import { useQueries } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { getTickerQueryOptions } from "../query-options-getters/getTickerQueryOptions";

export const useTickersQueries = (pairId: string) => {
  const { id, tickersAddresses } = getPairConfig(pairId);
  const { account } = useWallet();

  const queries = tickersAddresses.map((tickerAddress) =>
    getTickerQueryOptions(id, tickerAddress, account)
  );

  return useQueries({ queries });
};
