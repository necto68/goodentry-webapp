import { useRewardTrackerDataQuery } from "../../queries/hooks/useRewardTrackerDataQuery";
import { useTokenQuery } from "../../queries/hooks/useTokenQuery";
import { useVaultTokenQuery } from "../../queries/hooks/useVaultTokenQuery";
import { getVaultConfig } from "../../vault/helpers/getVaultConfig";

export const useVaultStakeModalQueries = (vaultId: string) => {
  const {
    chainId,
    addresses: { vault, rewardTracker = "" },
  } = getVaultConfig(vaultId);

  const vaultTokenQuery = useVaultTokenQuery({
    chainId,
    tokenAddress: vault,
    spenderAddress: rewardTracker,
  });

  const rewardTrackerDataQuery = useRewardTrackerDataQuery(vaultId);
  const rewardTrackerData = rewardTrackerDataQuery.data;
  const { rewardTokenAddress } = rewardTrackerData ?? {};

  const rewardTokenQuery = useTokenQuery({
    chainId,
    tokenAddress: rewardTokenAddress,
  });

  return {
    vaultTokenQuery,
    rewardTrackerDataQuery,
    rewardTokenQuery,
  };
};
