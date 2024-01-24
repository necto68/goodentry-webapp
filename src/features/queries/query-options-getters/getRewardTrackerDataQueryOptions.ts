import { rewardTrackerDataFetcher } from "../fetchers/rewardTrackerDataFetcher";
import { QueryType } from "../types/QueryType";

export const getRewardTrackerDataQueryOptions = (
  vaultId: string,
  account?: string
) => ({
  queryKey: [QueryType.REWARD_TRACKER_DATA, vaultId, account],
  queryFn: async () => await rewardTrackerDataFetcher(vaultId, account),
});
