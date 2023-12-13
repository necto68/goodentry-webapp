import { useQuery } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { getTickerQueryOptions } from "../query-options-getters/getTickerQueryOptions";

import type { TickerQueryParameters } from "../types/TickerQueryParameters";

export const useTickerQuery = ({
  pairId,
  tickerAddress,
}: TickerQueryParameters) => {
  const { id } = getPairConfig(pairId);
  const { account } = useWallet();

  const options = getTickerQueryOptions(id, tickerAddress, account);

  return useQuery(options);
};
