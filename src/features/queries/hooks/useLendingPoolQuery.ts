import { useQuery } from "@tanstack/react-query";

import { getPairConfig } from "../../pair/helpers/getPairConfig";
import { useWallet } from "../../wallet/hooks/useWallet";
import { getLendingPoolQueryOptions } from "../query-options-getters/getLendingPoolQueryOptions";

import type { LendingPoolQueryParameters } from "../types/LendingPoolQueryParameters";

export const useLendingPoolQuery = ({
  pairId,
  lendingPoolAddress,
}: LendingPoolQueryParameters) => {
  const { id } = getPairConfig(pairId);
  const { account } = useWallet();

  const queryOptions = getLendingPoolQueryOptions(
    id,
    lendingPoolAddress,
    account
  );

  return useQuery(queryOptions);
};
