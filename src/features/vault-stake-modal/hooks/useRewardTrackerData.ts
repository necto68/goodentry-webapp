import { useRewardTrackerDataQuery } from "../../queries/hooks/useRewardTrackerDataQuery";

export const useRewardTrackerData = (vaultId: string) => {
  const rewardTrackerDataQuery = useRewardTrackerDataQuery(vaultId);

  return rewardTrackerDataQuery.data;
};
