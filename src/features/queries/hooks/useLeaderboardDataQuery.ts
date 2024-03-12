import { useQuery } from "@tanstack/react-query";

import { getLeaderboardDataQueryOptions } from "../query-options-getters/getLeaderboardDataQueryOptions";

export const useLeaderboardDataQuery = () => {
  const queryOptions = getLeaderboardDataQueryOptions();

  return useQuery(queryOptions);
};
